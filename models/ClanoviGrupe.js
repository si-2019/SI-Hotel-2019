/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clanoviGrupe', {
    idVeza: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idVeza'
    },
    idAdministrator: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idAdministrator'
    },
    idGrupa: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'GrupaChat',
        key: 'idgrupa'
      },
      field: 'idGrupa'
    },
    idKorisnik: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idKorisnik'
    }
  }, {
    tableName: 'ClanoviGrupe'
  });
};
