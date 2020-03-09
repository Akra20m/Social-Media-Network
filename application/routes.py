from application import app, db, ma, jwt
from flask import jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_marshmallow import Marshmallow
from passlib.hash import sha256_crypt
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
from datetime import datetime, timedelta
from .models import Posts, Users, Comments, Personal, AvatarSchema, PostSchema, CommentSchema
import os

blacklist = set()

avatar_schema = AvatarSchema(many=True)
posts_schema = PostSchema(many=True)
post_schema = PostSchema()
comments_schema = CommentSchema(many=True)
comment_schema = CommentSchema()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    """serves React App"""
    return send_from_directory('../client/build', "index.html")

# User Registration
@app.route('/users', methods=['POST'])
def users():
    email = request.json.get('email')
    name = request.json.get('name')
    password = sha256_crypt.encrypt(str(request.json.get('password')))
    username = request.json.get('username').lower()
    user_email = Users.query.filter_by(email=email).first()
    user_username = Users.query.filter_by(username=username).first()
    if user_email or user_username:
        return jsonify({'msg': 'This email/username exists in our database'}), 409

    user = Users(name, email, username, password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User added'}), 201

# User login
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username").lower()
    password = request.json.get("password")
    usernamecandidate = Users.query.filter_by(username=username).first()
    if usernamecandidate != None:
        if sha256_crypt.verify(password, usernamecandidate.password):
            access_token = create_access_token(
                identity=username, expires_delta=timedelta(hours=3))
            return jsonify({'msg': 'Login succeed', 'access_token': access_token, 'username': username, 'email': usernamecandidate.email, 'isLoggedIn': True, 'role': usernamecandidate.role})
        else:
            return jsonify({'msg': 'Login faild. Wrong Password'}), 422
    else:
        return jsonify({'msg': 'Login faild. Username not found'}), 422

# Fetch the posts for a profile
@app.route('/users/<string:username>/<int:id>', methods=['GET'])
@jwt_required
def user(username: str, id: int):
    user_posts = Posts.query.filter_by(username=username)[-id:]
    user = Users.query.filter_by(username=username).first()
    posts_count = db.session.query(db.func.count(
        Posts.post)).filter_by(username=username).scalar()
    if posts_count <= id:
        noMore = True
        id = posts_count
    else:
        noMore = False
    current_user = get_jwt_identity()
    if user:
        if username == current_user:
            result = posts_schema.dump(user_posts)
            # result_user=user_schema.dump(user)
            return jsonify(result, {'noMoreUser': noMore})
        else:
            return jsonify({'msg': 'Unauthorized'}), 401

    else:
        return jsonify({'msg': 'This user does not exist in our database'}), 404

# Delete a user
@app.route('/users/<string:username>', methods=['DELETE'])
@jwt_required
def delete_user(username: str):
    user = Users.query.filter_by(username=username).first()
    current_user = get_jwt_identity()
    if user:
        if username == current_user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'msg': 'User is deleted'}), 202
        else:
            return jsonify({'msg': 'Unauthorized'}), 401

    else:
        return jsonify({'msg': 'This user does not exist in our database'}), 404


# Fetch comments of a post / Submit a new post
@app.route("/comments/<int:id>", methods=['GET', 'POST'])
@jwt_required
def comments(id: int):
    if request.method == 'GET':
        comments_list = Comments.query.filter_by(postid=id)
        result = comments_schema.dump(comments_list)
        return jsonify(result)
    elif request.method == 'POST':
        comment = request.json.get('comment')
        username = get_jwt_identity()
        date = datetime.now()
        comment_object = Comments(id, comment, username, date)
        db.session.add(comment_object)
        db.session.commit()
        comments_list = Comments.query.filter_by(postid=id)
        result = comments_schema.dump(comments_list)
        return jsonify(result), 201

# Delete comment
@app.route("/comments/<int:id>/<int:postid>", methods=['DELETE'])
@jwt_required
def commentdelete(id: int, postid: int):
    current_user = get_jwt_identity()
    user = Users.query.filter_by(username=current_user).first()
    comment = Comments.query.filter_by(id=id).first()
    if comment:
        if ((comment.username == current_user) or user.role):
            db.session.delete(comment)
            db.session.commit()
            comments_list = Comments.query.filter_by(postid=postid)
            result = comments_schema.dump(comments_list)
            return jsonify(result)
        else:
            return jsonify({'msg': 'Unauthorized'}), 401
    else:
        return jsonify({'msg': 'This comment does not exist in our database'}), 404


# Delete/Edit a post and fetch certain posts
@app.route('/posts/<int:id>', methods=['DELETE', 'PUT', 'GET'])
@jwt_required
def delete_put_post(id: int):
    current_user = get_jwt_identity()
    user = Users.query.filter_by(username=current_user).first()
    if request.method == 'GET':
        posts_count = db.session.query(db.func.count(Posts.post)).scalar()
        if posts_count <= id:
            noMore = True
            id = posts_count
        else:
            noMore = False
        # posts_list= Posts.query.all()[-id:]
        posts_list = Posts.query.order_by(Posts.id.desc()).limit(id).all()
        result = posts_schema.dump(posts_list)
        return jsonify(result, {'noMoreAll': noMore})

    elif request.method == 'DELETE':
        post = Posts.query.filter_by(id=id).first()
        if post:
            if ((post.username == current_user) or user.role):
                comments = Comments.query.filter(
                    Comments.postid == id).delete()
                db.session.delete(post)
                db.session.commit()
                return jsonify({'msg': 'Post Deleted'}), 202
            else:
                return jsonify({'msg': 'Unauthorized'}), 401
        else:
            return jsonify({'msg': 'This post does not exist in our database'}), 404

    elif request.method == 'PUT':
        post = Posts.query.filter_by(id=id).first()
        if post:
            if post.username == current_user:
                post.post = request.json.get('post')
                # post.date=datetime.now()
                db.session.commit()
                post = Posts.query.filter_by(id=id).first()
                #posts_list = Posts.query.all()
                result = post_schema.dump(post)
                return jsonify(result), 202
            else:
                return jsonify({'msg': 'Unauthorized'}), 401
        else:
            return jsonify({'msg': 'This post does not exist in our database'}), 404


@app.route('/posts', methods=['GET', 'POST'])
@jwt_required
def posts():
    if request.method == 'GET':
        posts_list = Posts.query.all()
        result = posts_schema.dump(posts_list)
        return jsonify(result)
    elif request.method == 'POST':
        post = request.json.get('post')
        username = get_jwt_identity()
        date = datetime.now()
        post_object = Posts(post, username, date)
        db.session.add(post_object)
        db.session.commit()
        posts_list = Posts.query.all()
        result = posts_schema.dump(posts_list)
        return jsonify(result), 201
# fetch all avatars
@app.route('/avatar')
@jwt_required
def avatars():
    users = Personal.query.all()
    result = avatar_schema.dump(users)
    return jsonify(result), 201

# update avatar
@app.route('/avatar/<int:id>')
@jwt_required
def avatar(id: int):
    current_user = get_jwt_identity()
    user = Personal.query.filter_by(username=current_user).first()
    if user:
        user.avatar = id
        db.session.commit()
        return jsonify({'msg': 'avatar updated'}), 201
    else:
        avatar_object = Personal(current_user, id)
        db.session.add(avatar_object)
        db.session.commit()
        return jsonify({'msg': 'avatar updated'}), 201


# Revoke user access token
@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    current_user = get_jwt_identity()
    return jsonify({'msg': 'Logout succeed', 'access_token': '', 'username': current_user, 'isLoggedIn': False})
