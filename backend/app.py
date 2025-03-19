import cv2
import face_recognition_models
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import face_recognition

from models.models import db, Contact, ChallengeRecord
from services.services import generate_challenge


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
    return jsonify({"status":"accetped"}), 200


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


@app.route('/generate-template', methods=['POST'])
def generate_template():
    pass

    try:
        print(request.files)

        image_data = request.files.get('image')

        if not image_data:
            return jsonify({'error' : 'No image provided'}), 400

        image = Image.open(image_data)
        image = np.array(image)

        if image.shape[-1] == 4:
            image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)
        elif len(image.shape) == 2 or image.shape[-1] == 1:
            image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)

        face_locations = face_recognition.face_locations(image)

        if not face_locations:
            return jsonify({'error' : 'No face detected'}), 400

        face_encodings = face_recognition.face_encodings(image)

        face_template = face_encodings[0].tolist()

        print(face_template)
        return jsonify({'biometric_template': face_template}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
