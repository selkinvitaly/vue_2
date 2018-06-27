const { getByUuid } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    const userId = ctx.params.id;
    const foundUser = getByUuid(userId);

    if (!foundUser) {
        ctx.status = 404; 
        return;
    }

    ctx.response.body = foundUser;
};
