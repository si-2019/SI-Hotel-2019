module.exports = function(app, con, db) {
    /* ovdje se pišu zahtjevi npr.
      app.get('/hotel', function(req, res) {
        res.send('hotel - ankete')  
      })
    */
   const Op = require('Sequelize').Op;

   app.post('/promijeniDatumIsteka', function(req, res) {
    const body = req.body

    let sql = "UPDATE Anketa SET datumIstekaAnkete = " + body.datumIstekaAnkete + "WHERE naziv = " + body.naziv
 
    con.query(sql, (err, result) => {
      if(err) {
        res.json({message: err})
        return;
      }
      res.json({message: "OK"})
    })
  })

  app.get('/dajAnketeZaProfesora',function(req,res){

  let sql='SELECT naziv FROM Anketa WHERE idNapravio = ALL (SELECT id FROM Korisnik WHERE idUloga = 3)'

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

    let sql='SELECT * FROM Anketa WHERE tipAnkete = "anketa za predmet"'
  
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
         let predmeti = []
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
      let predmeti = []
         for(let i = 0; i < result.length; i++) {
           predmeti.push(result[i].idPredmet)
         }
      db.predmet.findAll({
        where: {
          id: {in:[predmeti.toString()]}
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
  let idKorisnika = req.query.idUloga
  if(!idKorisnika) {
    res.json({message: "Nije poslan parametar idKorisnik"})
    return
 }
 // let idKorisnika=3;
  let datumTrenutni = new Date();

  db.anketa.findAll().then(function(rez){
    let istekaoRok = []

         for(let i = 0; i < rez.length; i++) {
           let pomocni=new Date(rez[i].datumIstekaAnkete);
           if(datumTrenutni-pomocni>=0)
           istekaoRok.push(rez[i].idAnketa)
         }
         if(idKorisnika==1){
          db.anketa.findAll({
            where:{
              tipAnkete: 'javna anketa',
              idAnketa: {in:[istekaoRok]}
            }}).then(function(rezultat){
              res.json(rezultat);
            }).catch(error => {
              res.json({error})
            })
            //fali jos ankete za predmete na koje je student upisan
        }
        else if(idKorisnika==2 || idKorisnika==3){
          db.anketa.findAll({
            where:{
              tipAnkete: 'javna anketa',
              idAnketa: {in:[istekaoRok]}
            }}).then(function(rezultat){
              res.json(rezultat);
            }).catch(error => {
              res.json({error})
            })
            //fale one ankete za cije predmete je on profesor
        }
        else if(idKorisnika==4){
        res.json(istekaoRok);
        }
    }).catch(error => {
      res.json({error})
    })
    
})

app.get('/dajListuPopunjenihAnketaNaMojimPredmetima',function(req,res){
  let idUlaz = req.query.idProfesora
  if(!idUlaz) {
    idUlaz = req.query.idAsistent
  }
  if(!idUlaz){
    res.json({message: "Nije poslan parametar idProfesora ili idAsistenta"})
         return
  }

  db.predmet.findAll({
    where:{
    [Op.or]: [{idProfesor: idUlaz}, {idAsistent: idUlaz}]
  }}).then(function(result){
    let predmetiLista = []
         for(let i = 0; i < result.length; i++) {
           predmetiLista.push(result[i].id)
         }
    db.anketa.findAll({
      where:{
        idPredmet: {[Op.in]:predmetiLista}
      }}).then(function(rez){
        let anketeLista = []
         for(let i = 0; i < rez.length; i++) {
           anketeLista.push(rez[i].idAnketa)
         }
         db.popunjenaAnketa.findAll({
           where:{
             idAnketa: {[Op.in]:anketeLista}
           }}).then(function(rezultat){
             res.json(rezultat)
           }).catch(error => {
            res.json({error})
          })
      }).catch(error => {
        res.json({error})
      })
  }).catch(error => {
    res.json({error})
  })
})

}