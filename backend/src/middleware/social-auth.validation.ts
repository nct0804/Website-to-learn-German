import { body } from "express-validator";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw new BadRequestError(errorMessages.join(", "));
  }
  next();
};

export const googleLoginValidation = [
  body("idToken")
    .notEmpty()
    .withMessage("Google ID Token ist erforderlich")
    .isString()
    .withMessage("Google ID Token muss ein String sein")
    .isLength({ min: 10 })
    .withMessage("Ungültiger Google ID Token"),

  handleValidationErrors,
];

export const facebookLoginValidation = [
  body("accessToken")
    .notEmpty()
    .withMessage("Facebook Access Token ist erforderlich")
    .isString()
    .withMessage("Facebook Access Token muss ein String sein")
    .isLength({ min: 10 })
    .withMessage("Ungültiger Facebook Access Token"),

  handleValidationErrors,
];

export const appleLoginValidation = [
  body("identityToken")
    .notEmpty()
    .withMessage("Apple Identity Token ist erforderlich")
    .isString()
    .withMessage("Apple Identity Token muss ein String sein")
    .isLength({ min: 10 })
    .withMessage("Ungültiger Apple Identity Token"),

  body("authorizationCode")
    .optional()
    .isString()
    .withMessage("Apple Authorization Code muss ein String sein"),

  handleValidationErrors,
];
