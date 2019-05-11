/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projektniZadatakClanGrupe', {
    idProjektniZadatak: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'ProjektniZadatak',
        key: 'idprojektnogzadatka'
      },
      field: 'idProjektniZadatak'
    },
    idClanGrupe: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'ClanGrupe',
        key: 'idclangrupe'
      },
      field: 'idClanGrupe'
    }
  }, {
    tableName: 'projektniZadatak_clanGrupe'
  });
};
