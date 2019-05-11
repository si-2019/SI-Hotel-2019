/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('predmetKabinet', {
    idPredmet: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Predmet',
        key: 'id'
      },
      field: 'idPredmet'
    },
    idKabinet: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Kabinet',
        key: 'idkabinet'
      },
      field: 'idKabinet'
    }
  }, {
    tableName: 'predmet_kabinet'
  });
};
