const { connection } = require('../data-access/connection');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Group = require('./Group');

const UserGroup = connection.define('UserGroup',{
},{
    tableName:'UserGroup',
    timestamps:false,
})
User.belongsToMany(Group,{through:UserGroup,foreignKey:'UserID',onUpdate:'CASCADE',onDelete:'CASCADE'})
Group.belongsToMany(User,{through:UserGroup,foreignKey:'GroupID',onUpdate:'CASCADE',onDelete:'CASCADE'})

module.exports = UserGroup;