require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose');

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

    const userdata = 
      {
        name: "Nagyot Fingó Bika",
        username: "BigFartEngine",
        email: "bigfartengine@yahoo.com",
        password: "asdasd",
        verified: true
      }
    
    let user_id = "";
    const existingUser = await User.find({username: userdata.username});
    if (existingUser.length === 0) {
      const user = new User(userdata);
      const newUser = await user.save();
      user_id = newUser._id;          
    } else {
      user_id = existingUser[0]._id;
    }
    console.log(user_id);

    const Place = require("./model/Place");  
    const placedata = 
      {
        title: "Grund"
      }
    
    let place_id = "";
    const existingPlace = await Place.find({title: placedata.title});
    if (existingPlace.length === 0) {
      const place = new Place(placedata);
      const newPlace = await place.save();
      place_id = newPlace._id;          
    } else {
      place_id = existingPlace[0]._id;
    }
    console.log(place_id);  
      
    const {Group} = require("./model/Group");  
    const {Member} = require("./model/Group");  
    const {Participant} = require("./model/Group");  
    const {Event} = require("./model/Group");  

    const memberdata = {user_id: user_id, role: "admin"}
    const member = new Member(memberdata);
    const participantdata = {user_id: user_id, message: "jövök"}
    const participant = new Participant(participantdata);

    const eventdata = {
      title: "Valami esemény",
      description: "A távoli jövőben",
      place_id: place_id,
      date: '2022-08-01',
      participants: [participant]
    }
    const event = new Event(eventdata);

    const groupdata = 
      {
        name: "FF teqball team",
        description: "Fortissima Fingus baráti köre",
        owner: user_id,
        members: [member],
        events: [event]
      }
    let group_id = "";
    const existingGroup = await Group.find({name: groupdata.name});
    if (existingGroup.length === 0) {
      const group = new Group(groupdata);
      const newGroup = await group.save();
      group_id = newGroup._id;          
    } else {
      group_id = existingGroup[0]._id;
    }
    console.log(group_id);      
    console.log("Ready to ....");
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