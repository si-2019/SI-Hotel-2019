/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clanGrupe', {
    idClanGrupe: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idClanGrupe'
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
    idGrupaProjekta: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'GrupaProjekta',
        key: 'idgrupaprojekta'
      },
      field: 'idGrupaProjekta'
    },
    ostvareniBodovi: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'ostvareniBodovi'
    },
    kreator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'kreator'
    }
  }, {
    tableName: 'ClanGrupe'
  });
};
