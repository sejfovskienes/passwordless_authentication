from flask import Blueprint, request, jsonify


auth_blueprint = Blueprint('auth', __name__)

# User database (temporary dictionary for testing)
users_db = {}  # Store face embeddings { "username": face_encoding }

@auth_blueprint.route("/register", methods=["POST"])
def register():
    return None

@auth_blueprint.route("/login", methods=["POST"])
def login():
    return None
