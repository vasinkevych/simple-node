require('dotenv').config({ silent: true });

//npms:
const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

//routes:
const employee = require('./routes/employee');

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'text'],
  })
);
app.use(json());
app.use(logger());

app.use(require('koa-static')(__dirname + '/public'));

// routes init
app.use(employee.routes(), employee.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
