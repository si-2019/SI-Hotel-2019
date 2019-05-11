/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('uloga', {
    idUloga: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idUloga'
    },
    naziv: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'naziv'
    }
  }, {
    tableName: 'Uloga'
  });
};
