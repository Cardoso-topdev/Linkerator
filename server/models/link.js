module.exports = (sequelize, type) => {
    return sequelize.define('link', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        url : {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        comment: {
           type: type.STRING,
           allowNull: true 
        },
        count: {
            type: type.INTEGER,
            defaultValue: 0 
        }
    })
}