const bodyParser = require('koa-bodyparser');


exports.init = app => {
    app.koa.use(bodyParser());
};
