// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path'); // ⬅ مهم عشان مسارات الـ build
// const EmployeeRouter = require('./Routers/Employees.routers');
// const DepartmentRouter = require('./Routers/Departments.routers');
// const AdminRouter = require('./Routers/Admin.routers');
// const ManagerRouter = require('./Routers/Managers.routers');
// const dbConnect = require('./utils/dbConnect');
// const status = require("./utils/status");

// const app = express();

// // ✅ تفعيل CORS (يفضل تحدد الدومين الفعلي وقت النشر)
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173", 
//   methods: ["GET", "POST", "PUT", "DELETE", 'PATCH'],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ✅ ميدل وير لقراءة JSON
// app.use(express.json());

// // ✅ الاتصال بقاعدة البيانات
// dbConnect(process.env.DATABASE_CONNECTION_PATH);

// // ✅ الراوترات (لازم قبل ما نضيف build)
// app.use('/api/Employees', EmployeeRouter);
// app.use('/api/Departments', DepartmentRouter);
// app.use('/api/admin', AdminRouter);
// app.use('/api/managers', ManagerRouter);

// // ✅ تقديم ملفات React بعد build
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// // ✅ أي مسار غير API يرجع index.html (عشان React Router)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// // ✅ هندلر للأخطاء
// app.use((error, req, res, next) => {
//   res.status(error.statusCode || 500).json({
//     status: error.statusText || status.ERROR,
//     message: error.message,
//     statusCode: error.statusCode,
//     data: null
//   });
// });

// // ✅ تشغيل السيرفر
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log('Server running on port:', PORT);
// });

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

// تفعيل CORS للسماح للفرونت إند
app.use(cors({
  origin: "http://localhost:5173", // رابط الفرونت إند
  methods: ["GET", "POST", "PUT", "DELETE", 'PATCH'],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ميدل وير لقراءة JSON
app.use(express.json());

// الاتصال بقاعدة البيانات
dbConnect(process.env.DATABASE_CONNECTION_PATH);

// الراوترات
app.use('/api/Employees', EmployeeRouter);
app.use('/api/Departments', DepartmentRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/managers', ManagerRouter);

// هندلر للأخطاء
// app.use((error, req, res, next) => {
//   res.status(error.statusCode || 500).json({
//     status: error.statusText || status.ERROR,
//     message: error.message,
//     statusCode: error.statusCode,
//     data: null
//   });
// });
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error); // لو الرد اتبعت خلاص، ما ترجعش JSON تاني
  }
  res.status(error.statusCode || 500).json({
    status: error.statusText || status.ERROR,
    message: error.message,
    statusCode: error.statusCode,
    data: null
  });
});


// تشغيل السيرفر
app.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT);
});
