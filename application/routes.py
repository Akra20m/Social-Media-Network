from application import app, db, ma, jwt
from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from passlib.hash import sha256_crypt
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
import datetime
from .models import Posts, Users, UserSchema, PostSchema

blacklist = set()
users_schema = UserSchema(many=True)
user_schema = UserSchema()
posts_schema = PostSchema(many=True)
post_schema = PostSchema()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist

#User Registration
@app.route('/users',methods=['POST'])
def users():
    email=request.form['email']
    name=request.form['name']
    password=sha256_crypt.encrypt(str(request.form['password']))
    username=request.form['username']
    user_email=Users.query.filter_by(email=email).first()
    user_username=Users.query.filter_by(username=username).first()

    if user_email or user_username:
        return jsonify({'msg':'This email/username exists in our database'}), 409

    user=Users(name,email,username,password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg':'User added'}), 201

#User login
@app.route('/login', methods=['POST'])
def login():
    username=request.form["username"]
    password=request.form["password"]
    usernamecandidate=Users.query.filter_by(username=username).first()
    if usernamecandidate != None:
        if sha256_crypt.verify(password,usernamecandidate.password):
            access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(hours=3))
            return jsonify({'msg':'Login succeed','access_token':access_token,'username':username})
        else:
            return jsonify({'msg':'Login faild. Wrong Password'}), 401
    else:
        return jsonify({'msg':'Login faild. Username not found'}), 401

#Get the posts for a profile
@app.route('/users/<string:username>',methods=['GET'])
@jwt_required
def user(username:str):
    user_posts = Posts.query.filter_by(username=username)
    user = Users.query.filter_by(username=username).first()
    current_user = get_jwt_identity()
    if user:
        if username == current_user:
            result=posts_schema.dump(user_posts)
            result_user=user_schema.dump(user)
            return jsonify(result,result_user)
        else:
            return jsonify({'msg':'Unauthorized'}), 401

    else:
        return jsonify({'msg':'This user does not exist in our database'}), 404

#Delete a user
@app.route('/users/<string:username>',methods=['DELETE'])
@jwt_required
def delete_user(username:str):
    user = Users.query.filter_by(username=username).first()
    current_user = get_jwt_identity()
    if user:
        if username == current_user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'msg':'User is deleted'}), 202
        else:
            return jsonify({'msg':'Unauthorized'}), 401

    else:
        return jsonify({'msg':'This user does not exist in our database'}), 404


#List all the posts / Submit a new post
@app.route("/posts",methods=['GET','POST'])
@jwt_required
def posts():
    if request.method == 'GET':
        posts_list = Posts.query.all()
        result=posts_schema.dump(posts_list)
        return jsonify(result)
    elif request.method == 'POST':
        post=request.form['post']
        username = get_jwt_identity()
        date=datetime.now()
        post_object=Posts(post,username,date)
        db.session.add(post_object)
        db.session.commit()
        return jsonify({'msg':'Post added'}), 201

#Delete a post
@app.route('/posts/<int:id>',methods=['DELETE'])
@jwt_required
def delete_post(id:int):
    post = Posts.query.filter_by(id=id).first()
    current_user = get_jwt_identity()
    if post:
        if post.username == current_user:
            db.session.delete(post)
            db.session.commit()
            return jsonify({'msg':'Post is deleted'}), 202
        else:
            return jsonify({'msg':'Unauthorized'}), 401

    else:
        return jsonify({'msg':'This post does not exist in our database'}), 404

# Revoke user access token
@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200
