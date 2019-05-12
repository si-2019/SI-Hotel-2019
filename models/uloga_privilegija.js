/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ulogaPrivilegija', {
    idUloga: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Uloga',
        key: 'iduloga'
      },
      field: 'idUloga'
    },
    idPrivilegija: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Privilegija',
        key: 'idprivilegija'
      },
      field: 'idPrivilegija'
    },
    idUloga: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'id_uloga'
    },
    idPrivilegija: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'id_privilegija'
    }
  }, {
    tableName: 'uloga_privilegija'
  });
};
