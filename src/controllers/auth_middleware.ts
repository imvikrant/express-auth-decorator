import { NextFunction } from 'express';
import { Request, Response } from 'express';
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(403).send('Permission Denied');
  }
};
