import type { Request, Response } from 'express';
import logger from '../logger/index.js';

export const getHealth = (req: Request, res: Response) => {
  logger.info('Health check requested');
  res.status(200).json({
    message: "Successfully fetched health status",
    data: {
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
};
