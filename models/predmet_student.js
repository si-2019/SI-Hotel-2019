/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('predmetStudent', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    idStudent: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idStudent'
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
    idAkademskaGodina: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'AkademskaGodina',
        key: 'id'
      },
      field: 'idAkademskaGodina'
    },
    ocjena: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      field: 'ocjena'
    },
    datumUpisa: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'datum_upisa'
    }
  }, {
    tableName: 'predmet_student'
  });
};
