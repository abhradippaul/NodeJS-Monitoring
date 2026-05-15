import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'dev',
  appName: process.env.APP_NAME || 'nodejs-monitoring',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nodejs-monitoring',
  logLevel: process.env.LOG_LEVEL || 'info',
  logToFile: process.env.LOG_TO_FILE !== 'false',
  logFile: process.env.LOG_FILE || 'logs/combined.log',
  errorFile: process.env.ERROR_FILE || 'logs/error.log',
  metrics: {
    httpRequestDurationName: 'http_request_duration_seconds',
    httpRequestDurationHelp: 'Duration of HTTP requests in seconds',
  }
};
