import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { STATUS, TEAM } from '../utils/constants.js';
import mongoose from 'mongoose';

//Models
import Strat from '../models/StratModel.js';
import User from '../models/userModel.js'


const withValidationErrors = (validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
  
          const firstMessage = errorMessages[0];
          console.log(Object.getPrototypeOf(firstMessage));
          if (errorMessages[0].startsWith('no job')) {
            throw new NotFoundError(errorMessages);
          }
          if (errorMessages[0].startsWith('not authorized')) {
            throw new UnauthorizedError('not authorized to access this route');
          }
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
  };


  export const validateStratInput = withValidationErrors([
    body('stratName').notEmpty().withMessage('Name is required').isLength({min:3, max:50}),
    body('stratDescription').notEmpty().withMessage('Strat is required'),
    body('Team')
      .isIn(Object.values(TEAM))
      .withMessage('invalid type value'),
  ]);


  export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
      const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
      const job = await Strat.findById(value);
      if (!job) throw new NotFoundError(`no job with id ${value}`);
      const isAdmin = req.user.role === 'admin';
      const isOwner = req.user.userId === job.createdBy.toString();
      if (!isAdmin && !isOwner)
        throw new UnauthorizedError('not authorized to access this route');
    }),
  ]);



  export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
  ]);
  
  export const validateLoginInput = withValidationErrors([
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
  ]);
  
  export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        //If current user ID doesn't match id in database throw error
        if (user && user._id.toString() !== req.user.userId) {
          throw new BadRequestError('email already exists');
        }
      }),
  ]);
  