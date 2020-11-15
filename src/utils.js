import logger from "./logger";

// Determine if a route requires authentication to access
// Currently all /api routes except for login require authentication to access
const isUnauthedRoute = request => request.path === '/api/login' || !request.path.startsWith('/api');

// Standard method for logging Express requests
const logRequest = (request, response) => logger.info(JSON.stringify({ method: request.method, url: request.originalUrl, status: response.statusCode }));

module.exports = {
    isUnauthedRoute,
    logRequest
}