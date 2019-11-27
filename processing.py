import cv2

img = cv2.imread('uploads/1.png')
edges = cv2.Canny(img,100,200)

cv2.imwrite('processed/a.png', edges)
print("Processing complete")