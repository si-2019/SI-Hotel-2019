/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ispitZabiljeska', {
    idIspitZabiljeska: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idIspitZabiljeska'
    },
    idIspit: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'idIspit'
    },
    idZabiljeska: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'idZabiljeska'
    }
  }, {
    tableName: 'IspitZabiljeska'
  });
};
