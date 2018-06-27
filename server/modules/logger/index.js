/**
 * Этот модуль при каждом require выдаёт новый инстанс логгера
 * То есть модуль не кэшируется
 */
const path = require('path');

const bunyan = require('./libs/bunyan');
const errSerializer = require('./libs/error-serializer');


// если имя не указано, тогда используется имя родительского модуля (или директории, если это index)
module.exports = name => {
    if (!name) {
        name = path.basename(module.parent.filename, '.js');

        if (name === 'index') {
            name = path.basename(path.dirname(module.parent.filename)) + '/index';
        }
    }
    return bunyan.createLogger({
        name,
        serializers: { err: errSerializer }
    });
};

delete require.cache[__filename];
