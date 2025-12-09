from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app= Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://contactapp-01.netlify.app"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})


app.config["SQLALCHEMY_DATABASE_URI"]= "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_pre_ping': True,
    'pool_recycle': 300,
    'pool_size': 10,
    'max_overflow': 20
}
app.config['SQLALCHEMY_ECHO'] = False  # Set True for SQL query debugging

db=SQLAlchemy(app)