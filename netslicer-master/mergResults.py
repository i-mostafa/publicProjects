from PIL import Image
import time

def get_concat_v(im1, im2):
    dst = Image.new('RGB', (im1.width, im1.height + im2.height))
    dst.paste(im1, (0, 0))
    dst.paste(im2, (0, im1.height))
    return dst

im1 = Image.open('slice1.png')
im2 = Image.open('slice2.png')
time.sleep(10)

get_concat_v(im1, im2).save('result.png')