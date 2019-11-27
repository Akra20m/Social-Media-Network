from application import app, db, ma
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


class Users(db.Model):
    __tablename__='registration_data'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.Text, unique=False)
    email=db.Column(db.Text, unique=True)
    username=db.Column(db.Text, unique=True)
    password=db.Column(db.Text, unique=False)

    def __init__(self,name,email,username,password):
        self.name=name
        self.email=email
        self.username=username
        self.password=password

class Posts(db.Model):
    __tablename__='posts'
    id=db.Column(db.Integer, primary_key=True)
    post=db.Column(db.String(150), unique=False)
    username=db.Column(db.Text, unique=False)
    date=db.Column(db.DateTime, unique=False)

    def __init__(self,post,username,date):
        self.post=post
        self.username=username
        self.date=date


class UserSchema(ma.Schema):
    class Meta:
        fields= ('id', 'name', 'email', 'username', 'password')


class PostSchema(ma.Schema):
    class Meta:
        fields= ('id', 'post', 'username', 'date')

