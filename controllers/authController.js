const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/usermodel');
const AppError = require('./../utils/apperror');



const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  try {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: 'none', secure: true
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      passwordConfirm: req.body.passwordConfirm
    });

    console.log(newUser)

    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log("Error")
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // 1) Get Name and Password
    const { name, password } = req.body;

    if (!name || !password) {
         return next(new AppError('Please provide name and password!', 400));
       }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ name }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect name or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  
  try {
    console.log(req.headers.authorization);
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get add grocery.', 401)
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

exports.isloggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      res.locals.user = currentUser;
      
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.logout = async (req, res, next) => {
  try {
    const cookieOptions = {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    };

    res.cookie('jwt', 'dummycookie', cookieOptions);

    res.status(200).json({
      status: 'success'
    });
    
  } catch (err) {
    next();
  }
};
