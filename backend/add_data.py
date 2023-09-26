from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from initial_db import user, item, user_item

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:55af5587f@localhost/shoplistapp'
db = SQLAlchemy(app)
db.init_app(app)

import bcrypt

if __name__ == '__main__':
    # Insert data into the User table

    password_user1 = "123".encode("utf-8") 
    salt = bcrypt.gensalt() 
    hashed_password = bcrypt.hashpw(password_user1, salt)
    new_user_1 = user(userid = 1, username = "Eva", password = hashed_password, email = "eva@usc.edu")
    new_item_1 = item(itemid = 1, itemname = "chips", price = 2.99, imagepath = "/itemimage/chips.png", description = "Chips in orignal flavor", stock = True, alternative = "cookies, popcorn", store_email = "hmart@gamil.com")
    new_item_2 = item(itemid = 2, itemname = "cookies", price = 1.99, imagepath = "/itemimage/cookies.png", stock = True, alternative = "chips, popcorn", store_email = "hmart@gamil.com")
    new_item_3 = item(itemid = 3, itemname = "popcorn", price = 5.99, imagepath = "/itemimage/popcorn.png", description = "spicy popcorn", stock = False, alternative = "cookies, chips", store_email = "hmart@gamil.com")
    new_item_4 = item(itemid = 4, itemname = "coke", price = 0.99, imagepath = "/itemimage/coke.png", description = "200ml", stock = True, alternative = "lemonade", store_email = "hmart@gamil.com")
    new_item_5 = item(itemid = 5, itemname = "lemonade", price = 1.50, imagepath = "/itemimage/lemonade.png", description = "500ml", stock = False, alternative = "coke", store_email = "target@gamil.com")
    new_item_6 = item(itemid = 6, itemname = "laundry_detergent", price = 12.99, imagepath = "../item_image/laundry.png", description = "1000ml", stock = True, store_email = "target@gamil.com")
    new_user_item_1 = user_item(comuserid = 1, comitemid = 2)
    new_user_item_2 = user_item(comuserid = 1, comitemid = 6)

    db.session.add(new_user_1)
    db.session.add(new_item_1)
    db.session.add(new_item_2)
    db.session.add(new_item_3)
    db.session.add(new_item_4)
    db.session.add(new_item_5)
    db.session.add(new_item_6)
    db.session.add(new_user_item_1)
    db.session.add(new_user_item_2)

    db.session.commit()

