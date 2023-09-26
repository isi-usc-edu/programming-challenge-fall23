from flask import Flask, request, jsonify, make_response, session, redirect, url_for, render_template
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from initial_db import db, user, item, user_item
import secrets
from flask_session import Session
import redis
from flask_login import login_required

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:55af5587f@localhost/shoplistapp'
app.config['SESSION_TYPE'] = "redis"
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USER_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_EHCO'] = True

bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def first_page():
    return "Hello world"

    
@app.route("/signup", methods=["POST"])
def signup():
    username = request.json["username"]
    password = request.json["password"]
    email = request.json["email"]

    user_exists = user.query.filter_by(username = username).first() is not None
 
    if user_exists:
        return jsonify({"error": "username already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = user(username = username, password=hashed_password, email = email)
    db.session.add(new_user)
    db.session.commit()
 
    session["userid"] = new_user.userid

    return jsonify({
        "userid": new_user.userid,
        "username": new_user.username,
        "email": new_user.email
    })



@app.route("/login", methods=['POST'])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user_name = user.query.filter_by(username=username).first()

    if user_name is None:
        return jsonify({"error": "username or password incorrect"}), 401

    if not bcrypt.check_password_hash(user_name.password, password):
        return jsonify({"error": "username or password incorrect"}), 401
        
    session["userid"] = user_name.userid
    
    return jsonify({
        "userid": user_name.userid,
        "username": user_name.username,
        "email": user_name.email
    }) 

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("userid")
    return "200"

@app.route("/me", methods=['GET'])
def get_current_user():
    user_id = session.get("userid")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user_me = user.query.filter_by(userid = user_id).first()

    return jsonify({
        "userid": user_me.userid,
        "email": user_me.email,
        "username": user_me.username
    })


@app.route("/mecart", methods=['GET'])
def mecart():
    user_id = session.get("userid")
    if user_id is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    cart_item = (
        item.query
        .join(user_item, item.itemid == user_item.comitemid)
        .filter(user_item.comuserid == user_id)
        .all()
    )
    user_cart = []
    for items in cart_item:
        info = {
            "itemid": items.itemid,
            "itemname": items.itemname,
            "price": items.price,
            "imagepath": items.imagepath,
            "description": items.description,
            "stock": items.stock,
            "alternative": items.alternative,
            "store_email": items.store_email
        }
        user_cart.append(info)
    return jsonify({"cart_items": user_cart}), 200


@app.route("/addcart", methods=['POST'])
def addcart():
    data = request.json
    item_id = data.get("itemid")

    user_id = session.get("userid")
    if user_id is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    useritem = user_item(comuserid=user_id, comitemid=item_id)
    db.session.add(useritem)
    db.session.commit()

    return jsonify({"message": "Item added to cart successfully"})
    

@app.route("/showitems", methods=['GET'])
def showitems():
    show_items = item.query.all()

    item_list = []
    for show_item in show_items:
        item_info = {
            "itemid": show_item.itemid,
            "itemname": show_item.itemname,
            "price": show_item.price,
            "imagepath": show_item.imagepath,
            "description": show_item.description,
            "stock": show_item.stock,
            "alternative": show_item.alternative,
            "store_email": show_item.store_email
        }
        item_list.append(item_info)

    return jsonify({"show_items": item_list})


if __name__ == '__main__':
    app.run(port=8000,debug=True)
