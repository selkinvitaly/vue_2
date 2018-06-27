const uuid = require('node-uuid').v4;


exports.init = app => {
    app.koa.use(async(ctx, next) => {
        const requestId = ctx.get('X-Request-Id') || uuid();
        ctx.state.requestId = requestId;
        ctx.state.logger = app.logger.child({ requestId });
        await next();
    });
};
