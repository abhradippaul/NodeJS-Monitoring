import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import healthRoutes from './routes/health.routes.js';
import infoRoutes from './routes/info.routes.js'; 
import logger from './utils/logger.js';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/health', healthRoutes);
app.use('/info', infoRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
