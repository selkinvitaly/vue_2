const Application  = require('./app');
const createLogger = require('./modules/logger');
const config       = require('./config');

const application = new Application();
const logger = createLogger();
const unhandledRejections = new Map(); // отслеживаем unhandled промисы


try {
    application.hostname = config.server.hostname;
    application.port = config.server.port;
    config.handlers.forEach(handlerPath => application.requireHandler(handlerPath));
    application.start();
} catch (err) {
    logger.error(err);
    process.exit(1);
}


process.on('uncaughtException', err => {
    application.logger.error({
        message: err.message,
        name: err.name,
        errors: err.errors,
        stack: err.stack
    });
    process.exit(255);
});


process.on('unhandledRejection', (reason, promise) => {
    promise.trackRejectionId = Math.random();
    setTimeout(() => {
        if (!promise.trackRejectionId) {
          return;
        }

        unhandledRejections.set(promise, reason);

        logger.error({
          err: reason,
          trackRejectionId: promise.trackRejectionId,
          length: unhandledRejections.size
        }, `unhandledRejection`);
    }, 100);
});


// если вдруг unhandled промис был всё-таки обработан
process.on('rejectionHandled', promise => {
    if (unhandledRejections.has(promise)) {
        unhandledRejections.delete(promise);

        logger.error({
          trackRejectionId: promise.trackRejectionId,
          length: unhandledRejections.size
        }, 'rejectionHandled1');
    } else {
        delete promise.trackRejectionId;
    }
});
