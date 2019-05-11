/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kategorijas', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'naziv'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt'
    }
  }, {
    tableName: 'kategorijas'
  });
};
