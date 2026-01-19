import cv2
import os
import pytesseract
import numpy as np
from datetime import datetime
from ultralytics import YOLO

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "anpr_model", "weights", "best.pt")


TESSERACT_CONFIG = "--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"


try:
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
except:
    pass


model = YOLO(MODEL_PATH)

def run_anpr_on_image(image_path):
    frame = cv2.imread(image_path)
    if frame is None:
        return None

    results = model.predict(frame, conf=0.45, verbose=False)

    for r in results:
        boxes = r.boxes.data
        for box in boxes:
            x1, y1, x2, y2 = map(int, box[:4])

            crop = frame[y1:y2, x1:x2]

            gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
            blur = cv2.GaussianBlur(gray, (5, 5), 0)
            _, thresh = cv2.threshold(
                blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
            )

            text = pytesseract.image_to_string(
                thresh, config=TESSERACT_CONFIG
            ).strip()

            if text:
                cleaned_text = "".join(text.split()).upper()
                if len(cleaned_text) >= 5:
                    return cleaned_text

    return None
