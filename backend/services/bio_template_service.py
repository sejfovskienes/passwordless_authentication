import torch
from facenet_pytorch import MTCNN, InceptionResnetV1
from PIL import Image
import numpy as np


mtcnn = MTCNN(keep_all=True)
model = InceptionResnetV1(pretrained='vggface2').eval()


def generate_biometrical_template(image_np):

    img = Image.fromarray(image_np)

    boxes, probs = mtcnn.detect(img)

    if boxes is None:
        raise ValueError("No faces detected in the image.")

    faces = mtcnn(img)

    if faces is None or len(faces) == 0:
        raise ValueError("No faces detected after MTCNN preprocessing.")

    embeddings = model(faces)

    biometrical_template = embeddings[0].detach().cpu().numpy()

    return biometrical_template

