import listEndpoints from 'express-list-endpoints';
import type { Application } from 'express';
import logger from '../logger/index.js';

const logRoutes = (app: Application) => {
    // Express 5 compatibility hack: express-list-endpoints expects app._router
    // In Express 5, the router is moved to app.router
    if (!(app as any)._router && (app as any).router) {
        (app as any)._router = (app as any).router;
    }

    try {
        const endpoints = listEndpoints(app);
        
        if (!endpoints || endpoints.length === 0) {
            logger.warn('No routes found or express-list-endpoints is incompatible with this Express version.');
            return;
        }

        const routes = endpoints.map(endpoint => {
            const methods = Array.isArray(endpoint.methods)
                ? endpoint.methods.join(', ').toUpperCase()
                : Object.keys(endpoint.methods || {}).join(', ').toUpperCase();
            
            return {
                Method: methods || 'UNKNOWN',
                Path: endpoint.path
            };
        });

        // Display routes in tabular format
        console.table(routes);
        logger.info(`Registered ${routes.length} routes`);
    } catch (error) {
        logger.error(`Failed to log routes: ${error}`);
    }
};

export default logRoutes;
