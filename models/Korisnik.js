/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('korisnik', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    idOdsjek: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Odsjek',
        key: 'idodsjek'
      },
      field: 'idOdsjek'
    },
    idUloga: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Uloga',
        key: 'iduloga'
      },
      field: 'idUloga'
    },
    ime: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ime'
    },
    prezime: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'prezime'
    },
    datumRodjenja: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'datumRodjenja'
    },
    jmbg: {
      type: DataTypes.STRING(13),
      allowNull: true,
      field: 'JMBG'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'email'
    },
    mjestoRodjenja: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'mjestoRodjenja'
    },
    kanton: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'kanton'
    },
    drzavljanstvo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'drzavljanstvo'
    },
    telefon: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'telefon'
    },
    spol: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'spol'
    },
    imePrezimeMajke: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'imePrezimeMajke'
    },
    imePrezimeOca: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'imePrezimeOca'
    },
    adresa: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'adresa'
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'password'
    },
    linkedin: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'linkedin'
    },
    website: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'website'
    },
    fotografija: {
      type: "BLOB",
      allowNull: true,
      field: 'fotografija'
    },
    indeks: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'indeks'
    },
    ciklus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ciklus'
    },
    semestar: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'semestar'
    },
    titula: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'titula'
    }
  }, {
    tableName: 'Korisnik'
  });
};
