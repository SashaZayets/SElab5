import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const assetValidator = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(dtoClass, req.body);
    
    validate(output).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const errorsValidation: ErrorValidation[] = errors.map((error) => ({
          [error.property]: Object.values(error.constraints || {}).join(', '),
        }));

        const customError = new CustomError(
          400, 
          'Validation', 
          'Asset validation error', 
          null, 
          null, 
          errorsValidation
        );
        return next(customError);
      }
      
      req.body = output;
      return next();
    });
  };
};