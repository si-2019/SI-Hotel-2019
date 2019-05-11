/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zadatak', {
    idZadatak: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'idZadatak'
    },
    idZadaca: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Zadaca',
        key: 'idzadaca'
      },
      field: 'idZadaca'
    },
    redniBrojZadatkaUZadaci: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'redniBrojZadatkaUZadaci'
    },
    maxBrojBodova: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'maxBrojBodova'
    },
    brojOstvarenihBodova: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'brojOstvarenihBodova'
    },
    profesorovKomentar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'profesorovKomentar'
    },
    datumPredaje: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'datumPredaje'
    },
    statusZadatka: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'statusZadatka'
    },
    sadrzajFile: {
      type: "BLOB",
      allowNull: true,
      field: 'sadrzajFile'
    },
    velicinaFile: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'velicinaFile'
    },
    mimeTipUpdateZadatka: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'mimeTipUpdateZadatka'
    }
  }, {
    tableName: 'Zadatak'
  });
};
