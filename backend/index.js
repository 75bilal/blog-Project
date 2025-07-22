require('dotenv').config()
const express = require('express');
const app= express();

const mongoose = require('mongoose');
const cors =require('cors');
const cookieParser = require('cookie-parser');


const postroute =require('./routers/userpost.route')
const userRroute = require('./routers/user.route');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin :"http://localhost:5173",
    credentials: true,
}));



// ✅ Correct database connection
mongoose.connect('mongodb://127.0.0.1:27017/blogProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Database connected successfully!');
})
.catch((err) => {
    console.error('❌ Database connection failed:', err);
});



app.use('/api' , postroute);
app.use('/api/user',userRroute)

app.listen(PORT , () =>{
    console.log('server start at port ' , PORT);
})