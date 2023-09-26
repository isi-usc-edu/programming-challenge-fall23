from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:55af5587f@localhost/shoplistapp'
db = SQLAlchemy(app)

class user(db.Model, UserMixin):
    userid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.String(80), nullable=False)

class item(db.Model):
    itemid = db.Column(db.Integer, primary_key=True)
    itemname = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    imagepath = db.Column(db.String(255)) 
    description = db.Column(db.String(255))
    stock = db.Column(db.Boolean, nullable=False)
    alternative = db.Column(db.String(255))
    store_email = db.Column(db.String(255), nullable=False)

class user_item(db.Model):
    comid =  db.Column(db.Integer, primary_key=True)
    comuserid = db.Column(db.Integer, db.ForeignKey('user.userid'))
    comitemid = db.Column(db.Integer, db.ForeignKey('item.itemid'))

    forw_user_id = db.relationship('user', foreign_keys=[comuserid], backref='back_user_id')
    forw_item_id = db.relationship('item', foreign_keys=[comitemid], backref='back_item_id')


with app.app_context():
    db.create_all()