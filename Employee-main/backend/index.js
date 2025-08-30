
  require('dotenv').config();
const express = require('express');
const cors = require('cors');
const EmployeeRouter = require('./Routers/Employees.routers');
const DepartmentRouter = require('./Routers/Departments.routers');
const AdminRouter = require('./Routers/Admin.routers');
const ManagerRouter = require('./Routers/Managers.routers');
const dbConnect = require('./utils/dbConnect');
const status = require("./utils/status");

const app = express();


app.use(cors({
  origin: "http://localhost:5173", // رابط الفرونت إند
  methods: ["GET", "POST", "PUT", "DELETE", 'PATCH'],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//
app.use(express.json());

dbConnect(process.env.DATABASE_CONNECTION_PATH);

app.use('/api/Employees', EmployeeRouter);
app.use('/api/Departments', DepartmentRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/managers', ManagerRouter);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500).json({
    status: error.statusText || status.ERROR,
    message: error.message,
    statusCode: error.statusCode,
    data: null
  });
});


app.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT);
});
