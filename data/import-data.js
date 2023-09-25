const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Grocery = require('../models/grocerymodel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const grocerys = JSON.parse(
  fs.readFileSync(`${__dirname}/grocery-data.json`, 'utf-8')
);

const importdata = async () => {
  try {
    await Grocery.create(grocerys);
    console.log('Data added successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deletedata = async () => {
  try {
    await Grocery.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);
if (process.argv[2] === '--import') {
  importdata();
} else if (process.argv[2] === '--delete') {
  deletedata();
}
