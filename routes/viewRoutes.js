const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.isloggedIn);
router.get('/', viewsController.getgrocerys);
router.get('/login', viewsController.getLoginForm);
router.post('/search', viewsController.getSearch);
router.get('/me', authController.protect, viewsController.getAccount);


router.get('/my-lists', authController.protect, viewsController.getMyLists);

module.exports = router;
