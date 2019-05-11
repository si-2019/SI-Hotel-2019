/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('odgovor', {
    idOdgovor: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idOdgovor'
    },
    idPopunjenaAnketa: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'PopunjenaAnketa',
        key: 'idpopunjenaanketa'
      },
      field: 'idPopunjenaAnketa'
    },
    idPitanje: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Pitanje',
        key: 'idpitanja'
      },
      field: 'idPitanje'
    },
    idPonudjeniOdgovor: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'PonudjeniOdgovor',
        key: 'idponudjeniodgovor'
      },
      field: 'idPonudjeniOdgovor'
    },
    tekstOdgovora: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'tekstOdgovora'
    }
  }, {
    tableName: 'Odgovor'
  });
};
