/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipoviMaterijala', {
    idTipoviMaterijala: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idTipoviMaterijala'
    },
    naziv: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'naziv'
    }
  }, {
    tableName: 'TipoviMaterijala'
  });
};
