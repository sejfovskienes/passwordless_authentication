from urllib import request
from flask import Flask, request, jsonify
from flask_cors import CORS
from models.models import db, Contact
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///passwordless_authentication.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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

    return jsonify(({'message' : 'Message has been received succesfully'})), 200
if __name__ == '__main__':
    app.run()
