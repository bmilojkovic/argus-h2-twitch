# we use this script to make sure that all images are the correct size
# currently we are looking for all boons to be 88x88 and frames 108x108

# to run the scirpt, just provide the image path at CLI, or as first input

import sys
import os
from PIL import Image

if len(sys.argv) > 1:
    image_path = sys.argv[1]
else:
    image_path = input("Please input image directory path: ")

if not image_path.endswith(os.sep):
    image_path = image_path + os.sep

for img_file in os.listdir(image_path):
    img = Image.open(image_path + img_file)
    print(img_file + ": " + str(img.size))