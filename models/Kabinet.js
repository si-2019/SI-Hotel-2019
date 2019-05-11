/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kabinet', {
    idKabinet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idKabinet'
    },
    kapacitet: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      field: 'kapacitet'
    },
    namjena: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'namjena'
    }
  }, {
    tableName: 'Kabinet'
  });
};
