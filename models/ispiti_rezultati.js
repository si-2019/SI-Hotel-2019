/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ispitiRezultati', {
    idIspit: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Ispit',
        key: 'idispit'
      },
      field: 'idIspit'
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
    bodovi: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'bodovi'
    }
  }, {
    tableName: 'ispiti_rezultati'
  });
};
