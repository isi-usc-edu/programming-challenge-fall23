const PDFDocument = require('pdfkit');
const { saveAs } = require('file-saver');
const fs = require('fs');

const Grocery = require('../models/grocerymodel');
const List = require('../models/Listmodel');
const nodemailer = require('nodemailer');

exports.deletefromlist = async (req, res, next) =>
{
  try
  {
    const groceryId = req.params.groceryId;
    const user = req.user.id;
    await List.deleteOne({grocery: groceryId, user: req.user.id});
    res.status(200).json({
      status: 'success',
    });
  } catch (err) 
  {
    next(err);
  }
  };

exports.addtolist = async (req, res, next) => 
{
  try
  {
    const groceryId = req.params.groceryId;
const currentQuantity = req.body.currentQuantity;


const existingListItem = await List.findOne({ grocery: groceryId, user: req.user.id });

if (existingListItem) {
  
  existingListItem.quantity += currentQuantity;
  await existingListItem.save();
} else {
  
  const grocery = await Grocery.findById(groceryId);
  const price = grocery.price;
  const user = req.user.id;

  await List.create({ grocery, user, price, quantity: currentQuantity });
}
  res.status(200).json({
      status: 'success',
    });
  } catch (err) 
  {
    next(err);
  }
};

exports.sendmail = async (req, res, next) => 
{
  try
  {
  
  console.log(req.body.grocery);
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alyce.balistreri@ethereal.email',
        pass: 'X4JK6wpMzMHH9X9tbM'
    }
      });

      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream('grocery_list.pdf'));
    doc.text('Grocery List:');
    for (const item of req.body.grocery) {
      doc.text(`- ${item.name}: ${item.quantity}`);
    }

    doc.end();
    
    console.log(req.user.email)
      const mailOptions = {
        from: 'Grocerystore@.io',
        to: req.user.email,
        subject: "Your Grocery List",
        text: "Please find below your attached grocery list.",
        attachments: [
          {
            filename: 'grocery_list.pdf',
          path: 'grocery_list.pdf'
          }
        ]
      };
    
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        status: 'success',
      }); 
} catch (err) {
      next(err);
    }
};
