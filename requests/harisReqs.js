module.exports = function(app, con, db) {
    /* ovdje se pišu zahtjevi npr.
      app.get('/hotel', function(req, res) {
        res.send('hotel - ankete')  
      })
    */
    app.get('/hotel', function(req, res){
      res.send('nesto bzvz')
    })
    

    function insertSQL(table, obj) {
      return `INSERT INTO ${table}(${Object.keys(obj).toString()}) VALUES (${Object.values(obj).toString()})`
    }

    app.post('/createAnketa', function(req, res) {    
      const body = req.body
      db.korisnik.findOne({ 
        where: {
          id: body.idNapravio
      }}).then(napravio => {
        db.anketa.create({
          datumIstekaAnkete: body.datumIstekaAnkete,
          naziv: body.naziv,
          opisAnkete: body.opisAnkete,
          idPredmet: body.idPredmet ? body.idPredmet : null,
          tipAnkete: body.tipAnkete,
          idNapravio: body.idNapravio,
          napravioIme: napravio.ime + ' ' + napravio.prezime
        }).then(() => {
          res.json({message: "OK"})
        }).catch(error => {
          res.json({error})
        })
      }).catch(error => {
        res.json({error})
      })
      
    })

    app.get('/dajAnkete', (req, res) => {
      let sql = "SELECT * from Anketa"
      con.query(sql, (err, result) => {
        if(err) {
          res.json({message: err})
        }
        else {
          res.json({ankete: result})
        }
      })
    })

    

}