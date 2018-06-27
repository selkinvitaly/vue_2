exports.init = app => {
    app.koa.use(async(ctx, next) => {
        if (ctx.get('Origin')) {
            ctx.set('Access-Control-Allow-Origin', ctx.get('Origin'));
        }
        if (ctx.method === 'OPTIONS') {
            ctx.set('Access-Control-Allow-Methods', 'GET,HEAD');
            ctx.set('Access-Control-Allow-Headers', 'Content-Type');
            ctx.status = 204;
        }
        await next();
    });
};
