import firebase_admin
from firebase_admin import credentials
import firebase_admin.messaging as messaging
from starlette.config import Config
import os

current_file_dir = os.path.dirname(os.path.realpath(__file__))

cred_path = os.path.join(current_file_dir, "..", "..", "..","credentials.json")



cred = credentials.Certificate(cred_path)
default_app =  firebase_admin.initialize_app(cred)


def send_notification(title, msg, registration_token,dataObject=None):
    message = messaging.MulticastMessage(
        notification = messaging.Notification(
            title= title,
            body = msg
        ),
        data=dataObject,
        tokens=registration_token,
    )


# Send a message to the device corresponding to the provided
# registration token.
    response = messaging.send_multicast(message)
# Response is a message ID string.
    print('Successfully sent message:', response)
