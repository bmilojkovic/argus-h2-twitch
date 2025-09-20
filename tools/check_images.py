# we use this script to make sure that all images are the correct size
# currently we are looking for all boons to be 88x88 and frames 108x108

# to run the scirpt, just provide the image path at CLI, or as first input

import sys
import os
import os.path
import argparse
import json
from PIL import Image

arg_parser = argparse.ArgumentParser(description="Image verification tool.")
arg_parser.add_argument('--imgdir', default="public" + os.sep + "img")
arg_parser.add_argument('--type')
arg_parser.add_argument('--action', choices=["size", "mappings"], required=True)
arg_parser.add_argument('--mappings_file')

args = vars(arg_parser.parse_args())

image_path = args["imgdir"]
if not image_path.endswith(os.sep):
    image_path = image_path + os.sep

god_list = ["Aphrodite", "Apollo", "Ares", "Demeter", "Hera", "Hephaestus", "Hestia", "Poseidon", "Zeus"]

def duo_exists(god1, god2, boon_data):
    for boon_name, boon_properties in boon_data.items():
        if len(boon_properties["gods"]) == 2 and (god1 in boon_properties["gods"]) and (god2 in boon_properties["gods"]):
            return True
        
    return False

def check_all_images_exist():
    try:
        with open(args["mappings_file"], "r") as f:
            mappings = json.load(f)
    except FileNotFoundError:
        print("Error: The file " + args["mappings_file"] +  " was not found.")
    except json.JSONDecodeError:
        print("Error: Could not decode JSON.")
    all_good = True
    for boon_name, boon_properties in mappings["boons"].items():
        target_image_path = image_path + os.sep + boon_name + ".png"
        if not os.path.exists(target_image_path):
            print("Missing file: " + target_image_path)
            all_good = False
    for god1 in god_list:
        for god2 in god_list:
            if god1 != god2 and not duo_exists(god1, god2, mappings["boons"]):
                print("Missing duo: " + god1 + " and " + god2)
                all_good = False
    for keepsake_name, keepsake_properties in mappings["keepsakes"].items():
        target_image_path = image_path + os.sep + keepsake_name + ".png"
        if not os.path.exists(target_image_path):
            print("Missing file: " + target_image_path)
            all_good = False
    if all_good:
        print("All good. :)")
    return


def print_images_and_sizes():
    for img_file in os.listdir(image_path):
        if (args["type"] != None) and (not img_file.endswith(args["type"])):
            continue
        img = Image.open(image_path + img_file)
        print(img_file + ": " + str(img.size))
    return

# MAIN
if args["action"] == "size":
    print_images_and_sizes()
elif args["action"] == "mappings":
    check_all_images_exist()

