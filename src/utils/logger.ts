import winston from "winston"
import path from "path"

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 5
}

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    htpp: "magenta",
    debug: "white"
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss:ms"}),
    winston.format.colorize({all: true}),
    winston.format.printf(
        (info) => `${info.level}: ${info.message}`
    ),
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: path.join('logs', 'error', 'error.log'),
        level: 'error',
        format: winston.format.combine(
            winston.format.uncolorize(),
            winston.format.json()
        )
    })

]

const logger = winston.createLogger({
    level: process.env.LOG_LEVE || "debug",
    levels, 
    format,
    transports

})

export default logger