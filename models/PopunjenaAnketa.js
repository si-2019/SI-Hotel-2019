/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('popunjenaAnketa', {
    idPopunjenaAnketa: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idPopunjenaAnketa'
    },
    idAnketa: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Anketa',
        key: 'idanketa'
      },
      field: 'idAnketa'
    },
    idPopunio: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idPopunio'
    },
    vrijemePopunjavanja: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'vrijemePopunjavanja'
    }
  }, {
    tableName: 'PopunjenaAnketa'
  });
};
