import express from 'express';
import { body, param } from 'express-validator';
import { dataValidation } from '../middlewares';

export class AuthRoutes {
  public static bind() {
    const router = express.Router();

    router.post(
      '/login',
      // authMiddleware,
      dataValidation([
        body('fieldString').isString().isLength({ min: 1 }),
        body('fieldNumber').isNumeric().isInt({ min: 0 }),
        body('fieldBoolean').isBoolean(),

        // array of strings
        body('fieldArray').isArray(),
        body('fieldArray.*').isString(),

        // nested object
        body('fieldObject').isObject(),
        body('fieldObject.nestedField1').isString().isLength({ min: 1 }),
        body('fieldObject.nestedField2').isNumeric().isInt({ min: 0 }),

        // optional fields
        body('fieldOptional').optional().isString(),

        // custom validation
        body('fieldCustom').custom((value: any) => {
          if (value !== 'validValue') {
            throw new Error("fieldCustom must be 'validValue'");
          }
          return true;
        }),
      ]),
      //controller.createExample,
    );

    return router;
  }
}
