/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupaChat', {
    idGrupa: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idGrupa'
    },
    naziv: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'naziv'
    }
  }, {
    tableName: 'GrupaChat'
  });
};
