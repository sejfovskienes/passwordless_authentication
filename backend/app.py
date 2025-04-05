import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import face_recognition
import sqlite3
from services import bio_template_service

from models.models import db, Contact, ChallengeRecord, User
from services.services import generate_challenge

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///passwordless_authentication.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'

db.init_app(app)

CORS(app)

with app.app_context():
    db.create_all()
    print("Database created")

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()

    email = data['email']
    subject = data['subject']
    message = data['message']

    new_contact = Contact(email=email, subject=subject, message=message)
    db.session.add(new_contact)
    db.session.commit()
    print("email accepted")
    print(new_contact)
    return jsonify({"status": "accepted"}), 200

@app.route('/request-challenge', methods=['POST'])
def request_challenge():
    data = request.json
    email = data.get('email')
    challenge = generate_challenge()
    print(f"the email: {email} and the challenge: {challenge}")
    print("================== REQUESTING CHALLENGE PHASE PASSED ==================")

    record = ChallengeRecord(email=email, challenge=challenge)
    db.session.add(record)
    db.session.commit()

    return jsonify({"challenge": challenge})

@app.route('/register_data', methods=['POST'])
def register_data():
    try:
        data = request.json

        email = data.get('email')
        public_key = data.get('publicKey')


        if not email and not public_key:
            return jsonify({"error": "Missing email and public key"}), 400
        elif not email and public_key:
            return jsonify({"error": "Missing email"}), 400
        elif email and not public_key:
            return jsonify({"error": "Missing public key"}), 400

        new_user = User(email=email, public_key=public_key)
        db.session.add(new_user)
        db.session.commit()

        print("User added to the database:", new_user)
        print("================== REGISTRATION PHASE PASSED ==================")

        return jsonify({"status": "registered"}), 200

    except Exception as e:
        print("Error during registration:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route('/generate-template', methods=['POST'])
def generate_template():
    try:
        image_data = request.files.get('image')

        if not image_data:
            return jsonify({'error': 'No image provided'}), 400

        image_data.seek(0)
        image = Image.open(image_data)
        image = np.array(image)

        if image.shape[-1] == 4:
            image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)
        elif len(image.shape) == 2 or image.shape[-1] == 1:
            image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)

        face_id, biometric_template = bio_template_service.generate_biometrical_template(image)

        return jsonify({
            'face_id': face_id
        }), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
