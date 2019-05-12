/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zeljeniTermin', {
    idZeljeniTermin: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idZeljeniTermin'
    },
    idPredavac: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idPredavac'
    },
    idKabinet: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'idKabinet'
    },
    danUSedmici: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'danUSedmici'
    },
    brCasova: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'brCasova'
    },
    vrijeme: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'vrijeme'
    }
  }, {
    tableName: 'ZeljeniTermin'
  });
};
