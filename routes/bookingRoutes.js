const express = require('express');
const listController = require('./../controllers/listController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/add-to-list/:groceryId', listController.addtolist);
router.post('/delete-from-list/:groceryId', listController.deletefromlist);
router.post('/share-email', listController.sendmail);


module.exports = router;
