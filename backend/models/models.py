from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Contact(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Contact {self.email} - {self.subject} - {self.message}>'


class ChallengeRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    challenge = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<ChallengeRecord {self.email} - {self.challenge} - {self.timestamp}>"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    public_key = db.Column(db.String(200), nullable=False)
    registered_on = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<User: {self.id} - {self.email} - {self.public_key} - {self.registered_on}>"