import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),

    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error', silent: process.env.NODE_ENV === 'test' }),
        new winston.transports.File({ filename: 'combined.log', silent: process.env.NODE_ENV === 'test' })
    ]
});

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

export default logger;
