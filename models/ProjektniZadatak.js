/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projektniZadatak', {
    idProjektnogZadatka: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'idProjektnogZadatka'
    },
    idProjekta: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Projekat',
        key: 'idprojekat'
      },
      field: 'idProjekta'
    },
    opis: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'opis'
    },
    otkad: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'otkad'
    },
    dokad: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'dokad'
    },
    zavrsen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'zavrsen'
    },
    komentarAsistenta: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'komentarAsistenta'
    }
  }, {
    tableName: 'ProjektniZadatak'
  });
};
