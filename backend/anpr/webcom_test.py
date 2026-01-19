import cv2
import os
import pytesseract
import numpy as np
from datetime import datetime
from ultralytics import YOLO


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "anpr_model", "weights", "best.pt")

CROPPED_DIR = "cropped_plates"
TEXT_DIR = "detected_texts"

# Tesseract Configuration: PSM 7 (single line of text) and Whitelist (A-Z, 0-9)
TESSERACT_CONFIG = "--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"


os.makedirs(CROPPED_DIR, exist_ok=True)
os.makedirs(TEXT_DIR, exist_ok=True)

# YOLO model
print("Loading YOLO model...")
try:
    model = YOLO(MODEL_PATH)
except Exception as e:
    print(f"Error loading YOLO model: {e}")
    exit()

try:
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
except:
    
    pass 


cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Cannot open camera")
    exit()

print("\nSmartParkX ANPR started!")
print("Press 'C' to capture & detect plate")
print("Press 'Q' to quit\n")

last_text = ""


while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame.")
        break

    # Display status text
    cv2.putText(frame, f"Last Plate: {last_text}", (10, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
    cv2.putText(frame, "Press 'C' to Capture | 'Q' to Quit", (10, 470),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    cv2.imshow("SmartParkX - Live ANPR", frame)

    key = cv2.waitKey(1) & 0xFF

    if key == ord('c') or key == ord('C'):
        print("\n📷 Capturing frame for detection...")
        detected_any = False

        # Run YOLO detection on the captured frame (conf=0.45 is often a good start)
        results = model.predict(frame, conf=0.45, verbose=False) 

        for r in results:
            boxes = r.boxes.data
            for i, box in enumerate(boxes):
                x1, y1, x2, y2 = map(int, box[:4])

                # Draw box on the frame
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, "Plate", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

                # Crop detected plate
                crop = frame[y1:y2, x1:x2]
                
                # ---: Image Pre-processing ---
                
                # 1. Convert to Grayscale
                gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
                
                # 2. Gaussian Blur to reduce noise (helps with OCR)
                blur = cv2.GaussianBlur(gray, (5, 5), 0)
                
                # 3. OTSU Thresholding for pure black and white text (Best for varying lighting)
                # THRESH_OTSU automatically finds the best threshold value
                _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
                
                # Use the thresholded image for OCR
                final_image = thresh 
                
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                crop_filename = os.path.join(CROPPED_DIR, f"plate_{timestamp}.jpg")
                cv2.imwrite(crop_filename, final_image) # Save the processed crop

                # --- Tesseract OCR ---
                text = pytesseract.image_to_string(final_image, config=TESSERACT_CONFIG).strip()

                # --- Post-processing and Validation ---
                if text:
                    # Remove all whitespace/newlines and convert to uppercase
                    cleaned_text = "".join(text.split()).upper()
                    
                    # Basic validation: ensure the plate is at least 5 characters long
                    if len(cleaned_text) >= 5: 
                        detected_any = True
                        last_text = cleaned_text
                        print(f"✅ Detected Plate: {cleaned_text}")
                        
                        # Save result to file
                        with open(os.path.join(TEXT_DIR, "plates.txt"), "a") as f:
                            f.write(f"{timestamp} - {cleaned_text}\n")
                    else:
                        print(f"Unreliable detection (text too short): {cleaned_text}")
                        last_text = "Unreliable"
                else:
                    print("No readable text found.")
                    last_text = "Not Found"

        
        cv2.imshow("Detected - SmartParkX", frame)
        cv2.waitKey(1000)

        if not detected_any:
            print("No plate detected in this capture.")
            last_text = "No Plate Found"
        
    
    elif key == ord('q') or key == ord('Q'):
        print("\n Exiting SmartParkX ANPR...")
        break


cap.release()
cv2.destroyAllWindows()