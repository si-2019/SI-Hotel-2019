/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issues', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'status'
    },
    procitaoStudent: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'procitaoStudent'
    },
    procitalaSs: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'procitalaSS'
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
    },
    issueId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'kategorijas',
        key: 'id'
      },
      field: 'issueID'
    }
  }, {
    tableName: 'issues'
  });
};
