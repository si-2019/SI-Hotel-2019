/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('materijal', {
    idMaterijal: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idMaterijal'
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
    idTipMaterijala: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'TipoviMaterijala',
        key: 'idtipovimaterijala'
      },
      field: 'idTipMaterijala'
    },
    datumObjave: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'datumObjave'
    },
    datumIzmjene: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'datumIzmjene'
    },
    napomena: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'napomena'
    },
    objavljeno: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'objavljeno'
    },
    sedmica: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'sedmica'
    }
  }, {
    tableName: 'Materijal'
  });
};
