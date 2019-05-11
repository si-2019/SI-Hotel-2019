/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupaTermina', {
    idGrupaTermina: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idGrupaTermina'
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
    idPredavac: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idPredavac'
    },
    idKabinet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Kabinet',
        key: 'idkabinet'
      },
      field: 'idKabinet'
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'naziv'
    },
    danUSedmici: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'danUSedmici'
    },
    vrijeme: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'vrijeme'
    },
    trajanje: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'trajanje'
    },
    rokPrijave: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'rokPrijave'
    }
  }, {
    tableName: 'GrupaTermina'
  });
};
