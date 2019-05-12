/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projekat', {
    idProjekat: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idProjekat'
    },
    idKorisnik: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idKorisnik'
    },
    idPredmet: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Predmet',
        key: 'id'
      },
      field: 'idPredmet'
    },
    nazivProjekta: {
      type: DataTypes.STRING(85),
      allowNull: true,
      field: 'nazivProjekta'
    },
    progress: {
      type: "DOUBLE(20,3)",
      allowNull: true,
      field: 'progress'
    },
    opisProjekta: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'opisProjekta'
    },
    moguciBodovi: {
      type: "DOUBLE(10,0)",
      allowNull: true,
      field: 'moguciBodovi'
    },
    rokProjekta: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'rokProjekta'
    }
  }, {
    tableName: 'Projekat'
  });
};
