import type { Request, Response } from 'express';

export const getInfo = (req: Request, res: Response) => {
  res.status(200).json({
    name: 'NodeJS-Monitoring',
    version: '1.0.0',
    description: 'REST API for monitoring NodeJS application',
    environment: process.env.NODE_ENV || 'development'
  });
};
