import  http  from 'http';
import app from './app.js'

import { fetchData } from "./api/fetch.js";

const port = process.env.PORT || 5000;

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
const server = http.createServer(app);
server.listen(port,()=>{

    console.log('this app is running on '+port)});