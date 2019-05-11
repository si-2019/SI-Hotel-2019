/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupaTerminStudent', {
    idGrupaTerminaStudent: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idGrupaTerminaStudent'
    },
    idGrupaTermina: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'GrupaTermina',
        key: 'idGrupaTermina'
      },
      field: 'idGrupaTermina'
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
    datumPrijave: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'datumPrijave'
    }
  }, {
    tableName: 'grupaTermin_student'
  });
};
