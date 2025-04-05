from facenet_pytorch import MTCNN, InceptionResnetV1
from PIL import Image
import numpy as np
import hashlib
from torchvision import transforms
import torch
import cv2

mtcnn = MTCNN(keep_all=True)
model = InceptionResnetV1(pretrained='vggface2').eval()


def align_face(image, box, landmarks):

    left_eye = landmarks[0]
    right_eye = landmarks[1]


    dx = right_eye[0] - left_eye[0]
    dy = right_eye[1] - left_eye[1]
    angle = np.degrees(np.arctan2(dy, dx))


    center = ((left_eye[0] + right_eye[0]) / 2, (left_eye[1] + right_eye[1]) / 2)


    rot_mat = cv2.getRotationMatrix2D(center, angle, 1.0)
    aligned_img = cv2.warpAffine(image, rot_mat, (image.shape[1], image.shape[0]), flags=cv2.INTER_CUBIC)


    x1, y1, x2, y2 = [int(coord) for coord in box]
    face = aligned_img[y1:y2, x1:x2]
    face = cv2.resize(face, (160, 160))

    return face


def generate_biometrical_template(image_np):
    img = Image.fromarray(image_np)

    boxes, probs, landmarks = mtcnn.detect(img, landmarks=True)
    if boxes is None or landmarks is None:
        raise ValueError("No faces detected.")

    # Use the most confident face
    box = boxes[0]
    landmark = landmarks[0]

    aligned_face = align_face(image_np, box, landmark)

    # Convert to tensor and normalize
    preprocess = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize([0.5], [0.5])
    ])
    aligned_face_tensor = preprocess(aligned_face).unsqueeze(0)

    with torch.no_grad():
        embeddings = model(aligned_face_tensor)

    embedding_np = embeddings[0].cpu().numpy()
    embedding_np = embedding_np / np.linalg.norm(embedding_np)

    # Round to 3 decimal places for consistency
    rounded_embedding = np.round(embedding_np, decimals=3)
    embedding_str = ','.join(map(str, rounded_embedding))
    face_id = hashlib.sha256(embedding_str.encode()).hexdigest()

    return face_id, rounded_embedding

def generate_biometrical_template(image_np):
    img = Image.fromarray(image_np)

    # Detect face boxes only
    boxes, probs = mtcnn.detect(img)
    if boxes is None:
        raise ValueError("No faces detected.")

    box = boxes[0]  # Most confident face
    x1, y1, x2, y2 = [int(coord) for coord in box]
    face = image_np[y1:y2, x1:x2]

    # Resize to 160x160 for FaceNet input
    face = cv2.resize(face, (160, 160))

    # Normalize and convert to tensor
    preprocess = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize([0.5], [0.5])
    ])
    face_tensor = preprocess(face).unsqueeze(0)

    with torch.no_grad():
        embedding = model(face_tensor)

    # Normalize
    embedding_np = embedding[0].cpu().numpy()
    embedding_np = embedding_np / np.linalg.norm(embedding_np)

    # Round and hash
    rounded_embedding = np.round(embedding_np, decimals=2)  # more aggressive
    embedding_str = ','.join(map(str, rounded_embedding))
    face_id = hashlib.sha256(embedding_str.encode()).hexdigest()

    return face_id, rounded_embedding

