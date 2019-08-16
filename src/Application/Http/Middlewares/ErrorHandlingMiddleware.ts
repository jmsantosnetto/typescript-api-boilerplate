import { NextFunction, Response } from 'express'
import IMiddleware from '../../Configs/Interfaces/IMiddleware'
import ICustomRequest from '../../Configs/Interfaces/ICustomRequest'

class ErrorHandlingMiddleware implements IMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public intercepter (req: ICustomRequest, res: Response, next: NextFunction): NextFunction | Response | void {
    return next()
  }
}

export default new ErrorHandlingMiddleware().intercepter
