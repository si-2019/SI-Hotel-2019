/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupaZabiljeska', {
    idGrupaZabiljeska: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idGrupaZabiljeska'
    },
    idGrupaTermina: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'idGrupaTermina'
    },
    idZabiljeska: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'idZabiljeska'
    }
  }, {
    tableName: 'GrupaZabiljeska'
  });
};
