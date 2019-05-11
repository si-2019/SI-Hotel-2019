/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ispit', {
    idIspit: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idIspit'
    },
    idProfesor: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idProfesor'
    },
    idPredmet: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Predmet',
        key: 'id'
      },
      field: 'idPredmet'
    },
    brojStudenata: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'brojStudenata'
    },
    tipIspita: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'tipIspita'
    },
    rokPrijave: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'rokPrijave'
    },
    sala: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'sala'
    },
    termin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'termin'
    },
    vrijemeTrajanja: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'vrijemeTrajanja'
    },
    kapacitet: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'kapacitet'
    },
    napomena: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'napomena'
    }
  }, {
    tableName: 'Ispit'
  });
};
