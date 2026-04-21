import os
from datetime import timedelta

class Config:
    SECRET_KEY = 'your-secret-key-change-this-2024'
    
    # Database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///envirostruct.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Session
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = True
    SESSION_USE_SIGNER = True
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)