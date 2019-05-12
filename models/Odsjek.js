/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('odsjek', {
    idOdsjek: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idOdsjek'
    },
    naziv: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'naziv'
    }
  }, {
    tableName: 'Odsjek'
  });
};
