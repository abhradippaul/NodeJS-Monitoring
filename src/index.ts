import app from './app.js';
import logger from './utils/logger.js';
import { config } from './utils/config.js';
import { connectDB } from './config/db.js';

const PORT = config.port;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
