/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projektniFile', {
    idProjektniFile: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idProjektniFile'
    },
    idProjektniZadatak: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'ProjektniZadatak',
        key: 'idprojektnogzadatka'
      },
      field: 'idProjektniZadatak'
    },
    file: {
      type: "BLOB",
      allowNull: true,
      field: 'file'
    },
    fileSize: {
      type: DataTypes.INTEGER(100),
      allowNull: true,
      field: 'file_size'
    },
    fileType: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'file_type'
    },
    nazivFile: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'nazivFile'
    }
  }, {
    tableName: 'ProjektniFile'
  });
};
