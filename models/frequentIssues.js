/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('frequentIssues', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'naziv'
    },
    tekst: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'tekst'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt'
    }
  }, {
    tableName: 'frequentIssues'
  });
};
