const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  grocery: {
    type: mongoose.Schema.ObjectId,
    ref: 'Grocery',
    required: [true, 'Booking must belong to a Book!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Grocery List must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'Grocery must have a price.']
  },
  quantity: {
    type: Number,
    require: [true, 'A user must select quantity he needs'],
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

ListSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'grocery',
    select: 'name'
  });
  next();
});

const Selecting = mongoose.model('Selecting', ListSchema);

module.exports = Selecting;
