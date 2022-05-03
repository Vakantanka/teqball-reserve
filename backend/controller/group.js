const GroupService = require("../service/group");

const  apiRegister = async (req, res, next) => {
   if (!req.body.title || !req.body.description) return res.sendStatus(401);

   if (req.body.title.length < 5) return res.sendStatus(403);
   if (req.body.description.length < 5) return res.sendStatus(403);

   let option = { title: req.body.title };
   const existingGroup = await GroupService.getGroupByData(option);
   if (existingGroup.length === 1) return res.sendStatus(409);

   const group = await GroupService.saveGroup(req.body);
   if (group) {
      res.sendStatus(200);
   } else {
      res.sendStatus(400);
   }
}

module.exports = { apiRegister }