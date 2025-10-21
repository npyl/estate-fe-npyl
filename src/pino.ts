import pino from "pino";

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
});

const getMsg = (service: string, method?: string) =>
    method ? `[${service}]: ${method}` : undefined;

/**
 * Creates a logger instance configured for a specific service.
 *
 * Returns a logger object with methods (info, error, warn, debug) that automatically
 * prefix log messages with the service name and optional method name in the format
 * `[serviceName]: methodName`.
 *
 * @param {string} service - The name of the service to be used as a prefix in log messages
 *
 * @examples
 * #1:
 * const authLogger = getServiceLogger('AuthService');
 * authLogger.info({ userId: 123 }, 'login');
 * // Logs: [AuthService]: login { userId: 123 }
 *
 * #2:
 * authLogger.error('Connection failed', 'connectDatabase');
 * // Logs: [AuthService]: connectDatabase Connection failed
 */
const getServiceLogger = (service: string) => ({
    ...logger,
    info: (arg: object | string, method?: string) =>
        logger.info(arg, getMsg(service, method)),
    error: (arg: object | string, method?: string) =>
        logger.error(arg, getMsg(service, method)),
    warn: (arg: object | string, method?: string) =>
        logger.warn(arg, getMsg(service, method)),
    debug: (arg: object | string, method?: string) =>
        logger.debug(arg, getMsg(service, method)),
});

export { getServiceLogger };
export default logger;
