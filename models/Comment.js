/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    idComment: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idComment'
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
    idTheme: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Theme',
        key: 'idtheme'
      },
      field: 'idTheme'
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'text'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'timeCreated'
    }
  }, {
    tableName: 'Comment'
  });
};
