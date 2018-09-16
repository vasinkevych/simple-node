const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/app-work';
const log = require('fancy-log');

const EMPLOYEE_COLLECTION = 'employee';

class EmployeeModel {
  async getEmployees() {
    let db;
    try {
      db = await MongoClient.connect(url);
      return db
        .db()
        .collection(EMPLOYEE_COLLECTION)
        .find()
        .toArray();
    } finally {
      db.close();
    }
  }

  async insertEmployee(ctx) {
    let db;
    try {
      db = await MongoClient.connect(url);
      console.log(ctx);
      const data = ctx.request;
      console.log(data.body);
      return db
        .db()
        .collection(EMPLOYEE_COLLECTION)
        .insertOne(data.body.employee);
    } catch (err) {
      log(err);
    } finally {
      db.close();
    }
  }
}

module.exports = EmployeeModel;
