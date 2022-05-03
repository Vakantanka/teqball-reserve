const GroupService = require("../service/group");

const  apiRegister = async (req, res, next) => {
   if (!req.body.name || !req.body.description) return res.sendStatus(401);

   if (req.body.name.length < 5) return res.sendStatus(403);
   if (req.body.name.length < 5) return res.sendStatus(403);

   let option = { name: req.body.name };
   const existingGroup = await GroupService.getGroupByData(option);
   if (existingGroup.length === 1) return res.sendStatus(409);

   req.body.owner = req.user_id;
   const group = await GroupService.saveGroup(req.body);
   if (group) {
      res.sendStatus(200);
   } else {
      res.sendStatus(400);
   }
}

const apiFindGroupByName = async (req, res, next) => {

   try {
      let name = req.body.name || {};
      let option = { name: name };
      const group = await GroupService.getGroupByData(option);
      console.log(group);
      if (group.length > 0) {
         res.sendStatus(204);
      } else {
         res.sendStatus(200);
      }
   } catch (error) {
      res.status(500).json({error: error})
   }
}


module.exports = { apiRegister, apiFindGroupByName }