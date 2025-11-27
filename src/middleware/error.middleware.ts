import {Request, Response, NextFunction} from 'express'

const ErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction ) => {

    console.log(error)

    let httpError = error.status || 500
    let message   = error.message || "Se ha producido un error al realizar la petición"
    let detais = error.details || ""

    res.status(httpError).json({ error: message, type: error.name || "Error", detais })


}

export default ErrorMiddleware