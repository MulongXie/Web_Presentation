import os
import sys
# *** set project root directory ***
root = '/'.join(__file__.split('/')[:-1])
sys.path.append(os.path.join(root, 'processing'))
# **********************************
import time
import cv2

import ip_preprocessing as pre

start = time.clock()
index = sys.argv[1]

input_path = 'uploads/' + str(index) + '.png'
output_path = 'processed/pro' + str(index) + '.png'

print("*** Processing starts ***")
img = cv2.imread(input_path, 0)
binary = pre.preprocess(img)

cv2.imwrite(output_path, binary)
print("*** Processing complete, time taken: %.3fs ***" % (time.clock() - start))