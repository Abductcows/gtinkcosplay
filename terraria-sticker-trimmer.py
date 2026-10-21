#!/usr/bin/python3

from PIL import Image
from pathlib import Path

input_dir = Path(r'C:\Users\georg\Downloads\tinkerer-cosplay\sticker\readyToShip')
output_dir = input_dir / 'out'

img_width, img_height = 1600, 800
target_width, target_height = 1260, 330

if __name__ == '__main__':
    output_dir.mkdir(parents=True, exist_ok=True)
    for i, image_path in enumerate(input_dir.glob("*.png")):
        image = Image.open(image_path)
        assert image.size == (img_width, img_height)
        wDiff2 = (img_width - target_width) // 2
        hDiff2 = (img_height - target_height) // 2
        cropped_image = image.crop((wDiff2,
                                   hDiff2,
                                   img_width - wDiff2,
                                   img_height - hDiff2))
        assert cropped_image.size == (target_width, target_height)
        cropped_image.save(output_dir / (str(i) + '.png'))
