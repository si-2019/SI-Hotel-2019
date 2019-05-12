/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datoteke', {
    idDatoteke: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idDatoteke'
    },
    idMaterijal: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Materijal',
        key: 'idmaterijal'
      },
      field: 'idMaterijal'
    },
    datoteka: {
      type: "BLOB",
      allowNull: true,
      field: 'datoteka'
    }
  }, {
    tableName: 'Datoteke'
  });
};
