const ns = require('sequelize-nested-sets');

module.exports = (sequelize, DataTypes) => {
    const Category = ns(sequelize, 'category', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            unique: true, 
            autoIncrement: true, 
            allowNull: false, 
        },
        name: DataTypes.STRING,
        link: { 
            type: DataTypes.STRING
        },
    }, {
        tableName: 'category',
        treeAttribute: 'tree',
    });
    return Category;
};