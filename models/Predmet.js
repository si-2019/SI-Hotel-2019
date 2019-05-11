/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('predmet', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    idAsistent: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idAsistent'
    },
    idProfesor: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idProfesor'
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'naziv'
    },
    ects: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'ects'
    },
    brojPredavanja: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'brojPredavanja'
    },
    brojVjezbi: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'brojVjezbi'
    },
    opis: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      field: 'opis'
    }
  }, {
    tableName: 'Predmet'
  });
};
