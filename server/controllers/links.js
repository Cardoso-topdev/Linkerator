const { links: Link, tags: Tag } = require('../models');
const { Op } = require("sequelize");
const $ = require('../utils');
const link = require('../models/link');
/**
 * It controls data in connection with database according to the request coming from the front-end.
 */
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * It adds the link to the db
     */
    addLink({body}, res) {
        // either find the existing tag name or create a new one
        const tags = $.addTags(body);
        /**
         * link connected with tags through link_tags table:
         * link.addTags(tags) writes the link-tag association to the link_tags table.
         * 
         */                                          
        const taggedLink = 
            Link.create(body)
            .then(link => Promise.all(tags)
                        .then(storedTags => link.addTags(storedTags, { 
                            through: { selfGranted: false }     
                        }))
                        .then(() => link));
        /**
         * the links tagged will be sent to the front-end.
         */
        $.sendTaggedLink(
            taggedLink, 
            $.successHander(res), 
            $.errorHander(res)
        );
    },

    /**
     * It fetches bookmarks from the db by the URL and Tag
     */
    findLinks(req, res) {
        /**
         * the url and tag searckey
         */
        const { url, tag } = req.query;
        const linksResult = [];
        /**
         * find all links mathing with the searchkeys
         */
        Link.findAll({
            include: [
                {
                    model: Tag,
                    as: "tags",
                    where: {
                        name: {
                            [Op.iLike] : `%${tag || ''}%`
                        }
                    },
                    attributes: []
                }
            ],
            where: {
                url: {
                    [Op.iLike] : `%${url || ''}%`
                }
            }
        })
        .then(async (links) => {
            /**
             * This part attaches their corresponding tags to the searched links.
             */
            let i = 0; 
            while(i < links.length) {
                try {
                    const _link = await Link.findByPk(links[i].id, {
                        include: [
                            {
                                model: Tag,
                                as: "tags",
                                attributes: ["name"]
                            }
                        ] 
                    })
                    linksResult.push(_link);
                    i ++;
                } catch(error) {
                    res.status(404).json({error: error});
                }
            }
            res.json({
                success: true,
                error: null,
                data: linksResult
            });
        })
        .catch(error => res.status(404).json({error: error}));
    },

    /**
     * update the link
     */
    updateLink(req, res) {
        const { linkId } = req.params;
        const { body } = req;
        const tags = $.addTags(req.body);
        Link.findByPk(linkId)
        .then((link) => {
            if(!link) {
                res.status(404).json({error: {
                    errors: [
                        {
                            message: 'The link already deleted'
                        }
                    ]
                }});
                return;
            }
            const taggedLink = link.update(body)
                .then(() => Promise.all(tags)
                    .then(storedTags => {
                        return link.setTags(storedTags, {
                            through: { selfGranted: false }     
                        })
                    })
                    .then(() => link)
                );
            return $.sendTaggedLink(taggedLink, $.successHander(res), $.errorHander(res))
        })
    },

    /**
     * delete the link
     */
    async deleteLinks(req, res) {
        const { body } = req;
        try {
            await Link.destroy({
                where: {
                    id: body.id
                }
            });
            res.send(200).json({
                success: true,
                error: null,
                data: 'Successfully deleted'
            }); 
        } catch(error) {
            res.status(404).json({error: error});
        }
    },

    /**
     * click count increment
     */
    clickCount(req, res) {
        const { id } = req.body;
        Link.findByPk(id)
        .then(link => link.update({count: link.count + 1})
            .then(() => res.json({
                success: true,
                error: null,
                data: link.count
            }))
            .catch(error => res.status(400).json({error: error}))        
        )
        .catch(error => res.status(400).json({error: error}));
    }
}
