const express = require('express');
const Grocery = require('../models/grocerymodel');
const Lists = require('../models/Listmodel');

exports.getSearch = async (req, res, next) => {
  try {
    const search = req.body.searchTerm
    const grocerys = await Grocery.find({
      "name": {
        "$regex": search, "$options": "i"
      }
    });

    console.log(grocerys)
    res.status(200).render('overview', {
      title: 'All Grocerys',
      grocerys
    });

  } catch (err) {
    next(err);
  }
};
exports.getgrocerys = async (req, res, next) => {
  try {
    const grocerys = await Grocery.find();
    res.status(200).render('overview', {
      title: 'All Grocerys',
      grocerys
    });
  } catch (err) {
    next(err);
  }
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};


exports.getAccount = async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your Account'
  });
};


const mongoose = require('mongoose'); 
exports.getMyLists = async (req, res, next) => {
  try {
    const lists = await Lists.find({ user: req.user.id });

    
    const groceryIdsWithQuantities = lists.map((el) => ({
      groceryId: el.grocery._id, 
      quantity: el.quantity, 
    }));
    
    const groceryIds = groceryIdsWithQuantities.map((el) => el.groceryId);

    const grocerys = await Grocery.find({ _id: { $in: groceryIds } });

    
    const groceryQuantitiesMap = new Map();
    groceryIdsWithQuantities.forEach((el) => {
      groceryQuantitiesMap.set(el.groceryId.toString(), el.quantity); 
    });

    
    grocerys.forEach((grocery) => {
      const quantity = groceryQuantitiesMap.get(grocery._id.toString()); 
      if (quantity !== undefined) {
        grocery.quantity =  quantity;
      }
    });

    console.log('grocerys:', grocerys);
    res.status(200).render('lists', {
      title: 'My Grocerys',
      grocerys,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data.');
  }
};
