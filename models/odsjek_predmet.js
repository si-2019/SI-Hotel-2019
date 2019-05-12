/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('odsjekPredmet', {
    idOdsjek: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Odsjek',
        key: 'idodsjek'
      },
      field: 'idOdsjek'
    },
    idPredmet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Predmet',
        key: 'id'
      },
      field: 'idPredmet'
    },
    semestar: {
      type: DataTypes.ENUM('1','2'),
      allowNull: false,
      field: 'semestar'
    },
    godina: {
      type: DataTypes.ENUM('1','2','3','4','5','6','7','8'),
      allowNull: false,
      field: 'godina'
    },
    obavezan: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      field: 'obavezan'
    }
  }, {
    tableName: 'odsjek_predmet'
  });
};
