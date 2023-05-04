import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { fetchData } from "./api/fetch.js";

import userRoutes from './routes/users.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({limit: '30mb',extended:true}));

app.use(bodyParser.urlencoded({limit: '30mb',extended:true}));
app.use(cors());

app.use('/user',userRoutes);
// .env setup
// PORT=5000
// CONNECTION_URL=mongodb+srv://sih2022:sih2022@societymanagment.teylon6.mongodb.net/?retryWrites=true&w=majority

const PORT =process.env.PORT;
// // mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=>app.listen(PORT,()=>console.log(`server running on port ${PORT}`))).catch((error)=>console.log(`${error} did not connected`));

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology: true});


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});
setInterval(() => {
  let obj = [];
  fetchData("user").then((data) => {
    obj = data;

    for (let x of obj) {
      // console.log(x);
      if (x.allowed === true) {
        const insertUser = async () => {
          const check = await user.findOne({ email: x.email });
          if (!check) {
            const res = await user.create({
              email: x.email,
              password: x.password,
              name: `${x.firstName} ${x.lastName}`,
            });
            // console.log(res);
          }
        };
        insertUser();
      } else {
        const deleteUser = async () => {
          const res = await user.deleteMany({ email: x.email });
          // console.log(res);
        };
        deleteUser();
      }
    }
  });
}, 10000);
app.get('*',(req,res)=>{
    res.status(200).json({
      message:'bad request'
    })
  })
 export default app;