const mongoose = require('mongoose');

const connect = (PATH)=>{
    mongoose.connect(PATH)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
}


module.exports= connect;