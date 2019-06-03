module.exports = function(app, con, db) {
    /* ovdje se pišu zahtjevi npr.
      app.get('/hotel', function(req, res) {
        res.send('hotel - ankete')  
      })
    */

   app.post('/promijeniDatumIsteka', function(req, res) {
    const body = req.body

    let sql = "UPDATE Anketa SET datumIstekaAnkete = '" + body.datumIstekaAnkete + "' WHERE idAnketa = " + body.idAnketa
 
    con.query(sql, (err, result) => {
      if(err) {
        res.json({message: err})
        return;
      }
      res.json({message: "OK"})
    })
  })

  app.get('/dajAnketeZaProfesora',function(req,res){

    if(!req.query.idProfesor) {
      res.json({error: "Nije poslan parametar idProfesor"})
      return
    }

  let sql='SELECT * FROM Anketa WHERE idNapravio = ' + req.query.idProfesor

    con.query(sql, function(error, result){
      if (error)
      {
        res.json({message: error});
        return;
      }
      res.json({ankete: result});
  })
  })

  app.get('/dajListuJavnihAnketa', function(req,res){

    let sql='SELECT * FROM Anketa WHERE tipAnkete = "javna anketa"'

    con.query(sql, function(error, result){
      if (error)
      {
        res.json({message: error});
        return;
      }
      res.json({ankete: result});
  })
  })

  app.get('/dajPopunjeneAnketeZaPredmet',function(req,res){

    let sql='SELECT PopunjenaAnketa.* FROM Anketa, PopunjenaAnketa WHERE Anketa.idAnketa = PopunjenaAnketa.idAnketa AND idPredmet = ' + req.query.idPredmet
  
      con.query(sql, function(error, result){
        if (error)
        {
          res.json({message: error});
          return;
        }
        res.json({ankete: result});
    })
    })

    app.get('/dajAnketeZaProfesoraPoPredmetima', function(req, res) {
      let idProfesora = req.query.idProfesora
      if(!idProfesora) {
         res.json({message: "Nije poslan parametar idProfesora"})
         return
      }
      let sql = "SELECT * FROM Anketa WHERE tipAnkete = 'anketa za predmet' AND idNapravio = " + idProfesora
      con.query(sql, function(error, result) {
         if(error) {
           res.json({message: error})
           return
         }
         let predmeti = [0]
         for(let i = 0; i < result.length; i++) {
           predmeti.push(result[i].idPredmet)
         }
         con.query('SELECT id, naziv FROM Predmet WHERE id IN (' + predmeti.toString() + ')', (greska, listaPredmeta) => {
            if(greska) {
              res.json({message: greska})
              return
            }
            let mapa = {}
            for(let i = 0; i < listaPredmeta.length; i++) {
              mapa[listaPredmeta[i].id] = listaPredmeta[i].naziv
            }
            let ankete = {}
            for(let i = 0; i < result.length; i++) {
              let id = result[i].idPredmet
              if(ankete[id]) {
                ankete[id].ankete.push(result[i])
              }
              else {
                ankete[id] = {
                  nazivPredmeta: mapa[id],
                  ankete: [result[i]]
                }
              } 
            }
            res.json({ankete})
         })
      })
  })

  app.get('/dajSveAnketePoPredmetima', function(req, res) {
    db.anketa.findAll({ 
      where: {
        tipAnkete: 'anketa za predmet'
    }}).then(function(result) {
      let predmeti = [0]
         for(let i = 0; i < result.length; i++) {
           predmeti.push(result[i].idPredmet)
         }
      db.predmet.findAll({
        where: {
          id: {[db.Sequelize.Op.in]: predmeti}
      }}).then(function(listaPredmeta){
        let mapa = {}
        for(let i = 0; i < listaPredmeta.length; i++) {
          mapa[listaPredmeta[i].id] = listaPredmeta[i].naziv
        }
        let ankete = {}
        for(let i = 0; i < result.length; i++) {
          let id = result[i].idPredmet
          if(ankete[id]) {
            ankete[id].ankete.push(result[i])
          }
          else {
            ankete[id] = {
              nazivPredmeta: mapa[id],
              ankete: [result[i]]
            }
          } 
        }
        res.json({ankete})
      }).catch(error => {
        res.json({error})
      })
    }).catch(error => {
      res.json({error})
    })
})

  app.get('/dajSveAnketeZaKojePostojeRezultati', function(req, res) {
    let idKorisnik = req.query.idKorisnik
    if(!idKorisnik) {
      res.json({message: "Nije poslan parametar idKorisnik"})
      return
  }
  db.korisnik.findOne({
    where: {
      id: idKorisnik
    }
  }).then(korisnik => {
    let Op = db.Sequelize.Op
      where = {
        datumIstekaAnkete: {
          [Op.lt]: new Date()
        }
      }
      let uloge = ['', 'STUDENT', 'ASISTENT', 'PROFESOR', 'ADMIN', 'STUDENTSKA_SLUZBA']
      if(uloge[korisnik.idUloga] != 'ADMIN') {
        let table = db.predmet_student
        let attributes = ['idPredmet']
        let Where = {
          idStudent: idKorisnik
        }
        if(uloge[korisnik.idUloga] != 'STUDENT') {
          table = db.predmet
          attributes = ['id']
          Where = {
            [Op.or]: {
              idProfesor: idKorisnik,
              idAsistent: idKorisnik
            }
          }
        }
        where[Op.or] = [{tipAnkete: 'javna anketa'}]
        table.findAll({
          attributes,
          where: Where
        }).then(predmeti => {
          predmeti = predmeti.map(p => p[attributes[0]]).concat(-1)
          where[Op.or].push({idPredmet: {[Op.in]: predmeti}})
          db.anketa.findAll({
            where
          }).then(function(ankete){
            res.json({ankete})
          }).catch(error => {
              res.json({error})
          })  
        })
      }

    
  }).catch(error => {
    res.json({error})
  })
  })

  app.post('/obrisiAnketu', function(req,res){

    let idAnkete = req.query.idAnketa
    let idKorisnika = req.query.idKorisnik
    if(!idAnkete || !idKorisnika) {
      res.json({message: "Nije poslan jedan od parametara"})
      return
  }
  db.korisnik.findOne({
    where:{
      id: idKorisnika
    }
  }).then(function (rez){
    if(rez.idUloga==4){
    db.anketa.destroy({
      where:{
        idAnketa: idAnkete
      }
    }).then(
      res.json("Anketa je obrisana")
    ).catch(error => {
      res.json({error})
  })
}
    db.anketa.findOne({
      where:{
        idAnketa:idAnkete,
        idNapravio: idKorisnika
      }
    }).then(function (rezultat){
           db.anketa.destroy({
             where:{
               idNapravio: rezultat.idNapravio,
               idAnketa: idAnkete
             }
           }).then(
             res.json("Anketa je obrisana")
           ).catch(error => {
            res.json({error})
        })
    }).catch(error => {
      res.json({error})
  })
  }).catch(error => {
    res.json({error})
})  
  })

  app.get('/dajAnketeNaPredmetimaZaStudenta', function(req, res) {
    let idStudenta = req.query.idStudent
    if(!idStudenta) {
      res.json({message: "Nije poslan parametar idStudent"})
      return
  }
  db.predmet_student.findAll({
    where: {
      idStudent: idStudenta
    }
  }).then(function(rez) {
    let predmeti = []
         for(let i = 0; i < rez.length; i++) {
           predmeti.push(rez[i].idPredmet)
         }
         let Op = db.Sequelize.Op
         db.anketa.findAll({
           where:{
            datumIstekaAnkete: {
              [Op.gt]: new Date()
            },
            idPredmet:{
              [Op.in]: predmeti
            }
           }
         }).then(function(result){
          res.json(result)
         }
         ).catch(error => {
          res.json({error})
      })  
  }).catch(error => {
    res.json({error})
})
  })

}
