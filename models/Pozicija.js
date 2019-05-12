/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pozicija', {
    idPozicija: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idPozicija'
    },
    x1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'x1'
    },
    x2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'x2'
    },
    y1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'y1'
    },
    y2: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'y2'
    }
  }, {
    tableName: 'Pozicija'
  });
};
