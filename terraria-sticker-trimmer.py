#!/usr/bin/python3

from PIL import Image
from pathlib import Path

input_dir = Path(r'C:\Users\georg\Downloads\tinkerer-cosplay\sticker\readyToShip')
output_dir = input_dir / 'out'

img_width, img_height = 1600, 800
output_paddings = [-30, -15, 30, 15]  # left, top, right, bottom

def getBoundingBoxOfNonWhite(img):
    left, top, right, bottom = 99999, 99999, -1, -1
    for x in range(img_width):
        for y in range(img_height):
            if img.getpixel((x,y)) == (255, 255, 255, 255):
                continue
            left = min(left, x)
            top = min(top, y)
            right = max(right, x)
            bottom = max(bottom, y)
    return left, top, right, bottom

if __name__ == '__main__':
    output_dir.mkdir(parents=True, exist_ok=True)
    for i, image_path in enumerate(input_dir.glob("*.png")):
        image = Image.open(image_path)
        assert image.size == (img_width, img_height)

        boundingBoxOfNonWhite = getBoundingBoxOfNonWhite(image)
        boundingBoxForCrop = tuple([boundingBoxOfNonWhite[i] + output_paddings[i] for i in range(len(output_paddings))])
        cropped_image = image.crop(boundingBoxForCrop)
        cropped_image.save(output_dir / (str(i) + '.png'))
