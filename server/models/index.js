const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
    /**
     * when deploying the app into the Heroku.
     */
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    /**
     * development mode
     */
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}


const db = {};
db.links = require('./link')(sequelize, Sequelize);
db.tags = require('./tag')(sequelize, Sequelize);

/**
 * link_tag will be our way of tracking relationship between links and tags models
   each link can have multiple tags and each tag can have multiple links
 */
db.links.belongsToMany(db.tags, {
    through: "link_tags",
    as : "tags",
    foreignKey: "link_id"
})

db.tags.belongsToMany(db.links, {
    through: "link_tags",
    as: "links",
    foreignKey: "tag_id"
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;