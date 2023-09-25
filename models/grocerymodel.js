const mongoose = require('mongoose');
const slugify = require('slugify');

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A grocery must have a name.']
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'A grocerry must have a Price.']
  },
  Instock: {
    type: Number,
    default: 0
  },
  imageLink: {
    type: String
  }
});

grocerySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Grocery = mongoose.model('Grocery', grocerySchema);

module.exports = Grocery;
