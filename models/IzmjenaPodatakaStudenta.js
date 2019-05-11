/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('izmjenaPodatakaStudenta', {
    idIzmjenaPodatakaStudenata: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idIzmjenaPodatakaStudenata'
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
    datumVrijemeIzmjene: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'datumVrijemeIzmjene'
    }
  }, {
    tableName: 'IzmjenaPodatakaStudenta'
  });
};
