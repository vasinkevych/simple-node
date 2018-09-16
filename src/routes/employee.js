const router = require('koa-router')();
const EmployeeModel = require('../model/employee');
const employeeModel = new EmployeeModel();

router.prefix('/employee');

//TODO: create controller classes to not call model from routes directly

// get all
router.get('/', async (ctx, next) => {
  ctx.body = await employeeModel.getEmployees();
});

//add new
router.put('/', async (ctx, next) => {
  ctx.body = await employeeModel.insertEmployee(ctx);
});

module.exports = router;
