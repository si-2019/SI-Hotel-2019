/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reply', {
    idReply: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idReply'
    },
    idComment: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Comment',
        key: 'idcomment'
      },
      field: 'idComment'
    },
    idUserCreator: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      },
      field: 'idUserCreator'
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
    tableName: 'Reply'
  });
};
