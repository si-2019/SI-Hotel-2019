/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zahtjevZaPotvrdu', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    idStudenta: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idStudenta'
    },
    idSvrhe: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'SvrhaPotvrde',
        key: 'id'
      },
      field: 'idSvrhe'
    },
    obradjen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'obradjen'
    },
    datumZahtjeva: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'datumZahtjeva'
    },
    datumObrade: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'datumObrade'
    },
    besplatna: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'besplatna'
    }
  }, {
    tableName: 'ZahtjevZaPotvrdu'
  });
};
