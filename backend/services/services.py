from random import random
import cv2
import random
import string
#import face_recognition


def generate_challenge():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=32))


