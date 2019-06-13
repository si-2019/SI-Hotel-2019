const Sequelize = require("sequelize");
const sequelize = new Sequelize("ohmXXciFMP","ohmXXciFMP","6xmnYQrGQK",{host:'remotemysql.com',dialect:"mysql",logging:console.log,  port: 3306,define: {
        timestamps: false
    }
});

const db = {}
db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.anketa = sequelize.import(__dirname+'/Anketa.js');
db.pitanje = sequelize.import(__dirname+'/Pitanje.js');
db.ponudjeniOdgovor = sequelize.import(__dirname+'/PonudjeniOdgovor');
db.odgovor = sequelize.import(__dirname+'/Odgovor');
db.popunjenaAnketa = sequelize.import(__dirname+'/PopunjenaAnketa');
db.predmet = sequelize.import(__dirname+'/Predmet');
db.korisnik = sequelize.import(__dirname+'/Korisnik');
db.predmet_student = sequelize.import(__dirname + '/predmet_student')


module.exports=db;