/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('theme', {
    idTheme: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idTheme'
    },
    idPredmet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Predmet',
        key: 'id'
      },
      field: 'idPredmet'
    },
    idUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idUser'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'title'
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'description'
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'closed'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'timeCreated'
    }
  }, {
    tableName: 'Theme'
  });
};
