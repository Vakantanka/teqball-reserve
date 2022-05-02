require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose');

// mySessionStorage = {};

const userRoutes = require('./route/user');
const contentRoutes = require('./route/content');
app.use('/api', contentRoutes);
app.use('/api/user', userRoutes);

const init = async () => {
  const Content = require("./model/Content");  
  try {
    const publicContentResponse =  await Content.findOne({endpoint: "/public"});
    if (!publicContentResponse) {
      const public = new Content({title: "Public content", content: "Public", endpoint: "/public"});
      public.save().then(() => console.log("Public saved."))
    }        
    const privateContentResponse =  await Content.findOne({endpoint: "/private"});
    if (!privateContentResponse) {
      const private = new Content({title: "Private content", content: "Private", endpoint: "/private"});
      private.save().then(() => console.log("Private saved."))          
    }

    const User = require("./model/User");  

    const placeholder = [
      {
        name: "Nagyot Fingó Bika",
        username: "BigFartEngine",
        email: "bigfartengine@yahoo.com",
        password: "asdasd",
        verified: true
      }
    ]
    const existingUsers = await Promise.all(placeholder.map((item) => User.find({username: item.username})));
  
    const newUsers = await Promise.all(existingUsers.map((existingUser, index) => {
      if (existingUser.length === 0) {
        const user = new User(placeholder[index]);
        user.save().then(() => console.log("Saved."))          
      }
    }));
      
  } catch (error) {
    console.log(error);
  }
}

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected.");
    init();
  })
  .catch(() => console.log("Error."));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})