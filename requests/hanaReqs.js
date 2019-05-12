module.exports = function(app, con, db) {
    /* ovdje se pišu zahtjevi npr.
      app.get('/hotel', function(req, res) {
        res.send('hotel - ankete')  
      })
    */

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

    let sql='SELECT naziv FROM Anketa WHERE tipAnkete = "anketa za predmet"'
  
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
}