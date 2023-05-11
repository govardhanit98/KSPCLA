from datetime import datetime


def image_name():
    

    now = str(datetime.now())
    now = now.replace('-','')
    now = now.replace(':','')
    now = now.replace(' ','')
    now = now.replace('.','')

    return now + str('.png')

