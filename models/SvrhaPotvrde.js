/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('svrhaPotvrde', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    nazivSvrhe: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'nazivSvrhe'
    }
  }, {
    tableName: 'SvrhaPotvrde'
  });
};
