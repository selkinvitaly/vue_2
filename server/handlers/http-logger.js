exports.init = app => {
    app.koa.use(async(ctx, next) => {
        const start = Date.now();

        // логгер запроса
        const logRequest = () => {
            const req = ctx.request;
            ctx.state.startTimeReq = start;
            ctx.state.logger.info({}, '--> %s %s', req.method, req.originalUrl || req.url);
        };

        const getStatus = err => {
            if (err) {
                return err.status || 500;
            }
            return ctx.status;
        };

        // логгер ответа
        const logResponse = err => {
            const res = ctx.response;
            const req = ctx.request;
            const finish = Date.now() - start;
            const logLevel = determineLogLevel(err); // определим уровень логгирования
            ctx.state.logger[logLevel]({}, '<-- %s %s %d %dms', req.method, req.originalUrl, getStatus(err), finish);
        };

        logRequest();
        try {
            await next();
        } catch (err) {
            console.error(err);
            ctx.status = getStatus(err);
            logResponse(err);
            return;
        }
        logResponse(null);
    });
};

function determineLogLevel(err) {
    if (!err) {
        return 'info';
    }

    switch (((err).status / 100 | 0) || 5) {
        case 4:
            return 'warn';
        case 5:
            return 'error';
        default:
            return 'info';
    }
}