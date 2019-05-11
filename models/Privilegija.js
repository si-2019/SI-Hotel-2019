/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('privilegija', {
    idPrivilegija: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idPrivilegija'
    },
    privilegija: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'privilegija'
    }
  }, {
    tableName: 'Privilegija'
  });
};
