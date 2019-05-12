/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chatDatoteke', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      field: 'naziv'
    },
    posiljaoc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'posiljaoc'
    },
    soba: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'soba'
    },
    mimetype: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'mimetype'
    },
    file: {
      type: "BLOB",
      allowNull: true,
      field: 'file'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt'
    }
  }, {
    tableName: 'ChatDatoteke'
  });
};
