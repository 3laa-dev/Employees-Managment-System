require('dotenv').config();
const express = require('express');
const EmployeeRouter = require('./Routers/Employees.routers');
const app = express();
const status = require("./utils/status");
const DepartmentRouter = require('./Routers/Departments.routers');
const AdminRouter = require('./Routers/Admin.routers');
const ManagerRouter = require('./Routers/Managers.routers');
const dbConnect = require('./utils/dbConnect');


dbConnect(process.env.DATABASE_CONNECTION_PATH)
  app.use(express.json());
  app.use('/api/Employees' , EmployeeRouter)
  app.use('/api/Departments' , DepartmentRouter )
  app.use('/api/admin'  ,AdminRouter )
  app.use('/api/managers'  , ManagerRouter);



  app.use((error, req, res, next) => {
  res.status(error.statusCode || 500)
    .json({
      status: error.statusText || status.ERROR,
      message: error.message, 
      statusCode:error.statusCode , 
      data: null  
    })
})

  app.listen(process.env.PORT, () => {
  console.log('Server running on port:',  process.env.PORT);
});