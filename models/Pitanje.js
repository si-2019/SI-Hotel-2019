/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pitanje', {
    idPitanja: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idPitanja'
    },
    idAnketa: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Anketa',
        key: 'idanketa'
      },
      field: 'idAnketa'
    },
    vrstaPitanja: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'vrstaPitanja'
    },
    tekstPitanja: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'tekstPitanja'
    }
  }, {
    tableName: 'Pitanje'
  });
};
