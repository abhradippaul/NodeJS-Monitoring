import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  logger.info(`Health endpoint: http://localhost:${PORT}/health`);
  logger.info(`Info endpoint: http://localhost:${PORT}/info`);
});
