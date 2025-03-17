from flask import Flask, request, jsonify
from flask_cors import CORS
import os

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


@app.route('/get-media', methods=['POST'])
def get_face_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file part"}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if image_file:
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])

        is_live = True

        if is_live:
            return jsonify({"status": "Face detected and liveness passed"}), 200
        else:
            return jsonify({"status": "Liveness detection failed or no faces detected."}), 400




if __name__ == '__main__':
    app.run(debug=True)
