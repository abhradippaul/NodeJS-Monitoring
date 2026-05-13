import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from '../utils/config.js';

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} [${level}]: ${message}`; // LOG FORMAT
});

const transports: winston.transport[] = [
    new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.label({ label: 'uat' }),
            myFormat,
        )
    })
];

// Add file rotation transport if not in "console-only" mode
if (config.logToFile) {
    transports.push(
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    );
}

const logger = winston.createLogger({
    level: config.logLevel,
    transports
});

export default logger;
