const Koa = require('koa');

const createLogger = require('./modules/logger');


module.exports = class Application {

    constructor() {
        this.koa = new Koa();
        this.logger = createLogger();

        this._server = null;
        this._handlers = new Map();
        this._port = null;
        this._hostname = null;
    }

    get port() {
        if (!this._port) {
            throw new Error('You must to set port for application!');
        }
        return this._port;
    }

    set port(port) {
        this._port = port;
    }

    get hostname() {
        if (!this._hostname) {
            throw new Error('You must to set hostname for application!');
        }
        return this._hostname;
    }

    set hostname(hostname) {
        this._hostname = hostname;
    }

    requireHandler(handlerPath) {
        try {
            require.resolve(handlerPath);
            this._handlers.set(handlerPath, require(handlerPath));
        } catch (err) {
            this.logger.warn(`Error for handler with path '${handlerPath}'`);
            console.error(err);
        }
    }

    async start() {
        this.logger.info(`Starting application...`);
        this._initHandlers();
        await this._startHandlers();
        await this._listenServer();
        this.logger.info(`Application has been started!`);
    }

    async shutdown() {
        this.logger.info(`Stopping application...`);
        await this._closeServer();
        await this._stopHandlers();
        this.logger.info(`Application has been stopped!`);
    }

    _initHandlers() {
        this.logger.info(`Initializing application handlers...`);
        for (let handler of this._handlers) {
            const [ key, moduleHandler ] = handler;
            if (typeof moduleHandler.init === 'function') {
                moduleHandler.init(this);
            }
        }
        this.logger.info(`Application handlers have been initialized!`);
    }

    async _listenServer() {
        this.logger.info(`Starting server...`);
        await (new Promise((resolve, reject) => {
            this._server = this.koa.listen(this.port, this.hostname, 511, err => {
                err && reject(err);
                resolve();
            });
        }));
        this.logger.info(`Server is listening %s:%d`, this.hostname, this.port);
    }

    async _closeServer() {
        this.logger.info(`Closing server...`);
        if (this._server) {
            await (new Promise((resolve, reject) => {
                this._server.close(err => {
                    err && reject(err);
                    resolve();
                });
            }));
        } else {
            this.logger.info(`Server isn't running!`);
        }
        this.logger.info(`Server has been closed!`);
    }

    async _startHandlers() {
        this.logger.info(`Starting application handlers...`);
        for (let handler of this._handlers) {
            const [ key, moduleHandler ] = handler;
            if (typeof moduleHandler.start === 'function') {
                await moduleHandler.start();
            }
        }
        this.logger.info(`Application handlers have been started!`);
    }

    async _stopHandlers() {
        this.logger.info(`Stopping application handlers...`);
        for (let handler of this._handlers) {
            const [ key, moduleHandler ] = handler;
            if (typeof moduleHandler.stop === 'function') {
                await moduleHandler.stop();
            }
        }
        this.logger.info(`Application handlers has been stopped!`);
    }

}
