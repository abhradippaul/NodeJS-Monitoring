import devLogger from './devLogger';
import uatLogger from './uatLogger';
import productionLogger from './productionLogger';
import { config } from '../utils/config.js';

let logger = null;

if (config.nodeEnv === 'production') {
    logger = productionLogger();
}

if (config.nodeEnv === 'uat') {
    logger = uatLogger();
}

if (config.nodeEnv === 'dev') {
    logger = devLogger();
}

export default logger;