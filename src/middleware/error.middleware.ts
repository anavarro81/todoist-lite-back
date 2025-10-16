import {Request, Response, NextFunction} from 'express'

const ErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction ) => {

    console.log(error)

    let httpError = error || 500
    let message   = error.message || "Se producido un error al realizar la petición"

    res.status(httpError).json(message)


}

export default ErrorMiddleware