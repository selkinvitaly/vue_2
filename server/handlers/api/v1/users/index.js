const router = require('./router');


exports.init = app => {
    app.koa.use(router.routes());
};
