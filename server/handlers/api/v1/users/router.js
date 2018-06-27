const Router = require('koa-router');

const getAllUsersController  = require('./controllers/get-all-users');
const getUserByIdController  = require('./controllers/get-user-by-id');
const updateUserByIdController = require('./controllers/update-user-by-id');

const router = new Router();


router.get('/api/v1/users', getAllUsersController);
router.get('/api/v1/users/:id', getUserByIdController);
router.put('/api/v1/users/:id', updateUserByIdController);

module.exports = router;
