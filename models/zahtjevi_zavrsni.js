/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zahtjeviZavrsni', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    idTema: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'teme_zavrsnih',
        key: 'id'
      },
      field: 'idTema'
    },
    idStudent: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idStudent'
    },
    idProfesor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idProfesor'
    },
    odobreno: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'odobreno'
    }
  }, {
    tableName: 'zahtjevi_zavrsni'
  });
};
