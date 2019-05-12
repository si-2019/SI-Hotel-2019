/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('porukas', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    tekst: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'tekst'
    },
    datum: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'datum'
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
    porukaId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'issues',
        key: 'id'
      },
      field: 'porukaID'
    }
  }, {
    tableName: 'porukas'
  });
};
