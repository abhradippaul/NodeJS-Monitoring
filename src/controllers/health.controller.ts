import type { Request, Response } from 'express';
import logger from '../utils/logger.js';

export const getHealth = (req: Request, res: Response) => {
  logger.info('Health check requested');
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};
