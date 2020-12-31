const apiRouter = require('express').Router();
const linkController = require('../controllers/links');
const tagController = require('../controllers/tags');

/**
 * to find the links according to both links and tag's search key
 * search keys are stored as query parms.
 */
apiRouter.get("/link", linkController.findLinks);
/**
 * to get all available tags from the tags table
 */
apiRouter.get("/tags", tagController.findTags);
/**
    when the user clicks the link, the db persits its visited count.
 * 
 */
apiRouter.post("/visit", linkController.clickCount);

/**
 * create new link to the links table
 */
apiRouter.post("/link", linkController.addLink);
/**
 * update the existing link
 */
apiRouter.patch("/link/:linkId", linkController.updateLink);
/**
 * delete the existing links
 */
apiRouter.delete("/link", linkController.deleteLinks);

module.exports = apiRouter;
