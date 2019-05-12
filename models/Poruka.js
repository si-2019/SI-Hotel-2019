/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('poruka', {
    idPoruka: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idPoruka'
    },
    idPosiljaoc: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idPosiljaoc'
    },
    idPrimaoc: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idPrimaoc'
    },
    idGrupa: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'idGrupa'
    },
    sadrzajPoruke: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'sadrzajPoruke'
    },
    file: {
      type: "BLOB",
      allowNull: true,
      field: 'file'
    }
  }, {
    tableName: 'Poruka'
  });
};
