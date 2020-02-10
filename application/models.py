from application import app, db, ma
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime


class Users(db.Model):
    __tablename__='registration_data'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.Text, unique=False)
    email=db.Column(db.Text, unique=True)
    username=db.Column(db.Text, unique=True)
    password=db.Column(db.Text, unique=False)
    role=db.Column(db.Boolean, unique=False)

    def __init__(self,name,email,username,password):
        self.name=name
        self.email=email
        self.username=username
        self.password=password
        self.role=0

class Personal(db.Model):
    __tablename__='personal'
    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.Text, unique=True)
    avatar=db.Column(db.Integer, unique=False)

    def __init__(self,username,avatar):
        self.username=username
        self.avatar=avatar

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

class Comments(db.Model):
    __tablename__='comments'
    id=db.Column(db.Integer, primary_key=True)
    postid=db.Column(db.Integer, unique=False)
    comment=db.Column(db.String(150), unique=False)
    username=db.Column(db.Text, unique=False)
    date=db.Column(db.DateTime, unique=False)

    def __init__(self,postid,comment,username,date):
        self.postid=postid
        self.comment=comment
        self.username=username
        self.date=date

class AvatarSchema(ma.Schema):
    class Meta:
        fields= ('username', 'avatar')

class PostSchema(ma.Schema):
    class Meta:
        fields= ('id', 'post', 'username', 'date')

class CommentSchema(ma.Schema):
    class Meta:
        fields= ('id', 'postid', 'comment', 'username', 'date')