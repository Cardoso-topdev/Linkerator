const { links: Link, tags: Tag } = require('../models');
const { Op } = require("sequelize");
/**
 * It finds all tags matching tag key.
 */
module.exports = {
    findTags(req, res) {
        const { tag } = req.params;
        Tag.findAll()
        .then(tags => res.status(200).json({
            success: true,
            error: null,
            data: tags
        }))
        .catch(error => res.status(404).json({error: error}))
    }
}