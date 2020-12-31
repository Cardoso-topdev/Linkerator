const { links: Link, tags: Tag } = require('../models');

module.exports = {
    /**
     * 
     * @param {object} body 
     * It adds tags to the Tag table
     */
    addTags(body) {
        return body.tags.map(tag =>
            Tag.findOrCreate({ 
                where: { name: tag.name }, 
                defaults: { name: tag.name }
            }).spread((tag, created) => tag));
    },
    /**
     * 
     * @param {Promise} link: taggedLink 
     * @param {callback fn} successCb : 
     * @param {callback fn} errorCb :
     * It sends down the tagged link to the frontEnd
     */
    sendTaggedLink(link, successCb, errorCb) {
        return link
        .then((link) => 
            Link.findByPk(link.id, {
                include: [
                    {
                        model: Tag,
                        as: "tags",
                        attributes: ["name"]
                    }
                ] 
            })
            .then(successCb)
            .catch(errorCb)
        )
        .catch(errorCb)
    },
    successHander(res) {
        return (result) => res.json({
            success: true,
            error: null,
            data: result
        });
    },
    errorHander(res) {
        return (error) => {
            return res.status(404).json({error: error})
        };
    }
}