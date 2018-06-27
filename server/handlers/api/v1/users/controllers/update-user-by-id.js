const { getByUuid, replaceByUuid } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    const userId = ctx.params.id;
    const foundUser = getByUuid(userId);

    const { uuid, firstName, lastName, titleName, phone, avatarUrl } = ctx.request.body;

    if (uuid !== userId) {
        ctx.status = 400;
        ctx.body = {
            error: 'specified uuid in request body must match the uuid in url'
        };
        return;
    }

    if (!foundUser) {
        ctx.status = 404; 
        return;
    }

    if (!firstName) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "firstName" for user'
        };
        return;
    }

    if (!lastName) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "lastName" for user'
        };
        return;
    }

    if (!titleName) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "titleName" for user'
        };
        return;
    }

    if (!phone) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "phone" for user'
        };
        return;
    }

    if (!avatarUrl && avatarUrl !== null) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "avatarUrl" for user'
        };
        return;
    }

    replaceByUuid(userId, {
        uuid, firstName, lastName, titleName, phone, avatarUrl
    });

    ctx.status = 204;
};
