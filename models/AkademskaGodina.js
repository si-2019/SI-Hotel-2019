/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('akademskaGodina', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    naziv: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'naziv'
    },
    aktuelna: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      field: 'aktuelna'
    },
    pocetakZimskogSemestra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'pocetak_zimskog_semestra'
    },
    krajZimskogSemestra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'kraj_zimskog_semestra'
    },
    pocetakLjetnogSemestra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'pocetak_ljetnog_semestra'
    },
    krajLjetnogSemestra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'kraj_ljetnog_semestra'
    }
  }, {
    tableName: 'AkademskaGodina'
  });
};
