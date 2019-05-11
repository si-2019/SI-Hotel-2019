/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temeZavrsnih', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    naziv: {
      type: DataTypes.STRING(70),
      allowNull: false,
      field: 'naziv'
    },
    idProfesora: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idProfesora'
    }
  }, {
    tableName: 'TemeZavrsnih'
  });
};
