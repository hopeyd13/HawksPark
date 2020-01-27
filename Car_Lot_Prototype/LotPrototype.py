# -*- coding: utf-8 -*-
"""
Created on Sun Jan 19 16:04:00 2020

@author: Nick
based on standard dlib object detection samples
"""

import os
import sys
import glob

import dlib



Prototype_Path = r'C:\Users\Nick\Downloads\Car_Lot_Prototype'

options = dlib.simple_object_detector_training_options()


#for symetrical object NVS
options.add_left_right_image_flips = True




options.C = 5

#cpu cores
options.num_threads = 4
options.be_verbose = True


training_xml_path = os.path.join(Prototype_Path, "training.xml")
testing_xml_path = os.path.join(Prototype_Path, "testing.xml")


#training of model based on images supplied into detector.svm
dlib.train_simple_object_detector(training_xml_path, "detector.svm", options)




print("")
print("Training accuracy: {}".format(
    dlib.test_simple_object_detector(training_xml_path, "detector.svm")))

print("Testing accuracy: {}".format(
    dlib.test_simple_object_detector(testing_xml_path, "detector.svm")))





#load detector.svm
detector = dlib.simple_object_detector("detector.svm")

# display hog filter
win_det = dlib.image_window()
win_det.set_image(detector)

#running model for each image, to be converted to video feed
print("Showing detections on the images in the Prototype_Path folder...")
win = dlib.image_window()
for f in glob.glob(os.path.join(Prototype_Path, "*.jpg")):
    print("Processing file: {}".format(f))
    img = dlib.load_rgb_image(f)
    dets = detector(img)
    print("Number of cars detected: {}".format(len(dets)))
    for k, d in enumerate(dets):
        print("Detection {}: Left: {} Top: {} Right: {} Bottom: {}".format(
            k, d.left(), d.top(), d.right(), d.bottom()))

    win.clear_overlay()
    win.set_image(img)
    win.add_overlay(dets)
    dlib.hit_enter_to_continue()



#set detector.svm as detector 1
detector1 = dlib.fhog_object_detector("detector.svm")
detector2 = dlib.fhog_object_detector("detector2.svm") 

#to combine detector models into 1 list of detectors
detectors = [detector1, detector2]
image = dlib.load_rgb_image(Prototype_Path + '/Lot (1).jpg')
[boxes, confidences, detector_idxs] = dlib.fhog_object_detector.run_multiple(detectors, image, upsample_num_times=1, adjust_threshold=0.0)
for i in range(len(boxes)):
    print("detector {} found box {} with confidence {}.".format(detector_idxs[i], boxes[i], confidences[i]))
    
    
    image2 = dlib.load_rgb_image(Prototype_Path + '/Lot (2).jpg')
[boxes, confidences, detector_idxs] = dlib.fhog_object_detector.run_multiple(detectors, image2, upsample_num_times=1, adjust_threshold=0.0)
for i in range(len(boxes)):
    print("detector {} found box {} with confidence {}.".format(detector_idxs[i], boxes[i], confidences[i]))

dlib.hit_enter_to_continue()


images = [dlib.load_rgb_image(Prototype_Path + '/Lot (1).jpg'),
          dlib.load_rgb_image(Prototype_Path + '/Lot (2).jpg')]

#boxes used for testing, will be used in final iteration as parking spaces.
boxes_img1 = ([dlib.rectangle(left=250, top=168, right=(202+250), bottom=(83+168)),
               dlib.rectangle(left=238, top=253, right=(235+238), bottom=(95+253)),
               dlib.rectangle(left=226, top=340, right=(271+226), bottom=(122+340)),
               dlib.rectangle(left=189, top=447, right=(308+189), bottom=(161+447)),
               dlib.rectangle(left=180, top=609, right=(346+180), bottom=(173+609))])


boxes_img2 = ([dlib.rectangle(left=0, top=0, right=887, bottom=674)])

boxes = [boxes_img1, boxes_img2]

detector2 = dlib.train_simple_object_detector(images, boxes, options)

#training second detector
detector2.save('detector2.svm')

win_det.set_image(detector2)
dlib.hit_enter_to_continue()

#accuracy as based on detector 2 and image boxes
print("\nTraining accuracy: {}".format(
    dlib.test_simple_object_detector(images, boxes, detector2)))
