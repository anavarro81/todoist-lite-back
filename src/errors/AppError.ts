class AppError extends Error {

    public readonly status: number;
    
    constructor (message: string, status=500, type="AppError")  {

        super(message)
        this.status=status
        this.name=type
        // Garantiza que instance AppError funcion como esperas. 
        Object.setPrototypeOf(this, new.target.prototype)

    }   

    static badRequest(message="Datos de la petición no validos" ) {
        return new AppError(message, 400, "badRequestError")
    }

    static unauthorized(message="Usuario no autenticado" ) {
        return new AppError(message, 401, "unauthorizedError")
    }
    
    // El usuario está autenticado pero no puede realizar la operación (no tiene permiso)
    static forbiden(message="Operacion no permitida") {
        return new AppError(message, 403, "forbidenError")
    }

    static notFound(message="No encontrado") {
        return new AppError(message, 404, "notFoundError")
    }   

    static conflict(message="Conflicto en los datos") {
        return new AppError(message, 409, "conflictError")
    }


}



