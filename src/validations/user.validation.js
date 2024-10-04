import { check, validationResult } from 'express-validator';

export const userRegisterValidation = [
    check('email', 'Please include a valid email').isEmail().isEmpty(),
    check('fullName', 'Full name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('avatar', 'Avatar must be a valid URL').optional().isURL(),
    check('coverImage', 'Cover image must be a valid URL').optional().isURL(),
];