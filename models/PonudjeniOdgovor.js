/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ponudjeniOdgovor', {
    idPonudjeniOdgovor: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idPonudjeniOdgovor'
    },
    idPitanja: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Pitanje',
        key: 'idpitanja'
      },
      field: 'idPitanja'
    },
    tekstOdgovora: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'tekstOdgovora'
    }
  }, {
    tableName: 'PonudjeniOdgovor'
  });
};
