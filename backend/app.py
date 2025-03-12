import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

from models.models import db, Contact, ChallengeRecord
from services.services import generate_challenge
import face_recognition

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///passwordless_authentication.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
db.init_app(app)

CORS(app)

with app.app_context():
    db.create_all()


@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()

    email = data['email']
    subject = data['subject']
    message = data['message']

    new_contact = Contact(email=email, subject=subject, message=message)
    db.session.add(new_contact)
    db.session.commit()


@app.route('/request-challenge', methods=['POST'])
def request_challenge():
    data = request.json

    email = data.get('email')
    challenge = generate_challenge()
    print(f"the email: {email} and the challenge: {challenge}")

    record = ChallengeRecord(email=email, challenge=challenge)
    db.session.add(record)
    db.session.commit()

    return jsonify({"challenge": challenge})


def process_video(video_path):
    video_capture = cv2.VideoCapture(video_path)

    frame_count = 0
    faces_detected = 0

    while True:
        ret, frame = video_capture.read()
        if not ret:
            break

        rgb_frame = frame[:, :, ::-1]

        faces_locations = face_recognition.face_locations(rgb_frame)

        if len(faces_locations) > 0:
            faces_detected += 1

        frame_count += 1

        video_capture.release()


    if faces_detected > 0:
        return True
    else:
        return False

@app.route('/get-media', methods=['POST'])
def get_face_video():
    if 'video' not in request.files:
        return jsonify({"error": "No video file part"}), 400

    video_file = request.files['video']
    if video_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if video_file:
        filename = secure_filename(video_file.filename)
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        video_file.save(video_path)

        # Process the video for face and liveness detection
        is_live = process_video(video_path)

        os.remove(video_path)

        if is_live:
            return jsonify({"status": "Face detected and liveness passed"}), 200
        else:
            return jsonify({"status": "Liveness detection failed or no faces detected."}), 400


if __name__ == '__main__':
    app.run()
