/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zadaca', {
    idZadaca: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'idZadaca'
    },
    idPredmet: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'idPredmet'
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'naziv'
    },
    brojZadataka: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'brojZadataka'
    },
    rokZaPredaju: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'rokZaPredaju'
    },
    ukupnoBodova: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'ukupnoBodova'
    },
    ukupniOstvareniBodovi: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'ukupniOstvareniBodovi'
    },
    postavka: {
      type: "BLOB",
      allowNull: true,
      field: 'postavka'
    }
  }, {
    tableName: 'Zadaca'
  });
};
