/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mimeTip', {
    idMimeTip: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'idMimeTip'
    },
    idZadatak: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Zadatak',
        key: 'idzadatak'
      },
      field: 'idZadatak'
    },
    mimeTip: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'mimeTip'
    }
  }, {
    tableName: 'MimeTip'
  });
};
