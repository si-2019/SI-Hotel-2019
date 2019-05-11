/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sticky', {
    idSticky: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idSticky'
    },
    idTheme: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Theme',
        key: 'idtheme'
      },
      field: 'idTheme'
    },
    idUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idUser'
    },
    set: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'set'
    }
  }, {
    tableName: 'Sticky'
  });
};
