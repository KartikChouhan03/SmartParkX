import sys
from pipeline import run_anpr_on_image

if len(sys.argv) < 2:
    print("NO_IMAGE")
    sys.exit(0)

image_path = sys.argv[1]
result = run_anpr_on_image(image_path)

if result:
    print(result)
else:
    print("UNKNOWN")
