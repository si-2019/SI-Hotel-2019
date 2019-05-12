/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zabiljeska', {
    idZabiljeska: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idZabiljeska'
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
    naziv: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'naziv'
    }
  }, {
    tableName: 'Zabiljeska'
  });
};
