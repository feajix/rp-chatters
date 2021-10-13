import winston from 'winston';

const print = winston.format.printf((info) => {
    const log = `${info.timestamp} ${info.level}: ${info.message}`;

    return info.stack ? `${log}\n${info.stack}` : log;
});

const myFormat = winston.format.combine(
    winston.format.cli({
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'cyan',
            debug: 'green',
        },
    }),
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }),
    winston.format.align(),
    print
);

const errorsFormat = winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.align(),
    print
);

export const fileLog = winston.createLogger({
    transports: [
        // new winston.transports.Console({
        //     format: myFormat
        // }),
        new winston.transports.File({
            dirname: __dirname,
            filename: 'errors.log',
            level: 'error',
            format: errorsFormat,
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            dirname: __dirname,
            filename: 'exceptions.log',
        }),
    ],
    exitOnError: false,
}).error;

export const consoleLog = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: myFormat,
        }),
    ],
});

// const errorLog = logger.error;
// const infoLog = logger.info;
