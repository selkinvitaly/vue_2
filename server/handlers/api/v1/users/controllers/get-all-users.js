const { getAll } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    ctx.response.body = getAll();
};
