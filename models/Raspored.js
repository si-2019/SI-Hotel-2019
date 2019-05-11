/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('raspored', {
    idTermin: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idTermin'
    },
    idKabinet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Kabinet',
        key: 'idkabinet'
      },
      field: 'idKabinet'
    },
    idGrupaTermin: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'GrupaTermina',
        key: 'idGrupaTermina'
      },
      field: 'idGrupaTermin'
    },
    danUsedmici: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'danUsedmici'
    },
    vrijeme: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'vrijeme'
    },
    tipNastave: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'tipNastave'
    }
  }, {
    tableName: 'Raspored'
  });
};
