import pyrebase

firebase_config = {
    "apiKey": "AIzaSyA9S7RCLLDgcBx_9SWhQAY_wSjiMdhMMTc",
    "authDomain": "a-eye-397619.firebaseapp.com",
    "databaseURL": "https://a-eye-397619-default-rtdb.firebaseio.com/",
    "projectId": "a-eye-397619",
    "storageBucket": "a-eye-397619.appspot.com",
    "messagingSenderId": "525146998604",
    "appId": "1:525146998604:web:34da26156b0b3a53de71e9",
    "measurementId": "G-5Y4MGM97GN"
}

firebase = pyrebase.initialize_app(firebase_config)

db = firebase.database()

#push data

data = {
    "name": "Peter Ojo",
    "age": 20,
    "address": ["New York", "London"]
}

# db.push(data)

# create my own key

db.child("Peter").set(data)
