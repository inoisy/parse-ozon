// import { DataTypes } from 'sequelize';
// import { Sequelize } from 'sequelize';
const ns = require('sequelize-nested-sets');
// const dataBaseConnectionURI = 'postgres://postgres:fuckoff11@localhost:5432/ozon';//process.env.DATABASE_URI;
// const sequelize = new Sequelize(dataBaseConnectionURI);

// async function main() {
//     try {
//         const Category = ns(sequelize, 'category', {
//             id: { 
//                 type: DataTypes.INTEGER, 
//                 primaryKey: true, 
//                 unique: true, 
//                 autoIncrement: true, 
//                 allowNull: false, 
//             },
//             name: DataTypes.STRING,
//             link: { 
//                 type: DataTypes.STRING
//             },
//         }, {
//             tableName: 'category',
//             treeAttribute: 'tree',
//         }
//         );
//         await sequelize.authenticate();
//         await sequelize.sync();
//         const cat = await Category.create({ name: 'одежда', });
//         console.log('🚀 ~ file: models.js ~ line 35 ~ main ~ cat', cat);
//     } catch (error) {
//         console.log('🚀 ~ file: index.js ~ line 59 ~ main ~ error', error);
  
//     }
// }
// main();  
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