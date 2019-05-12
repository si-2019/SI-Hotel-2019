/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupaProjekta', {
    idGrupaProjekta: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idGrupaProjekta'
    },
    idProjekat: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Projekat',
        key: 'idprojekat'
      },
      field: 'idProjekat'
    },
    nazivGrupe: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'nazivGrupe'
    },
    ostvareniBodovi: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'ostvareniBodovi'
    },
    komentarAsistenta: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'komentarAsistenta'
    }
  }, {
    tableName: 'GrupaProjekta'
  });
};
