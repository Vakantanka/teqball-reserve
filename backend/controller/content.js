const ContentService = require("../service/content");
// const authJwt = require('../middleware/authJwt');

const apiGetPublicContent = async (req, res, next) => {
   try {
      const content = await ContentService.getContentByEndpoint({endpoint: req.url});
      if(!content){
         res.status(404).json("There are no content yet!")
      }
      res.json(content);
   } catch (error) {
      res.status(500).json({error: error})
   }
}

const apiGetPrivateContent = async (req, res, next) => {
   // const sessionId = req.header('authorization')
   // if(!sessionId) return res.sendStatus(401)
   // const user = mySessionStorage[sessionId];
   // if (!user) return res.sendStatus(401);

   try {
      const content = await ContentService.getContentByEndpoint({endpoint: req.url});
      res.json(content);
   } catch (error) {
      res.status(500).json({error: error})
   }

}

module.exports = { apiGetPublicContent, apiGetPrivateContent }