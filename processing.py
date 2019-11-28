import cv2
import sys
import time

start = time.clock()
index = sys.argv[1]

img = cv2.imread('uploads/' + str(index) + '.png')
edges = cv2.Canny(img,100,200)

cv2.imwrite('processed/pro' + str(index) + '.png', edges)
print("Processing complete, time taken: %.3fs" % (time.clock() - start))