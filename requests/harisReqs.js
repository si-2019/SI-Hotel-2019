module.exports = function(app, con) {
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
      con.query('SELECT ime, prezime FROM Korisnik WHERE id = ' + body.idNapravio, (err, napravioIme) => {
        let sql = insertSQL('Anketa', {
          "datumIstekaAnkete": `DATE('${body.datumIstekaAnkete}')`,
          "datumKreiranja": "NOW()",
          "tipAnkete": `'${body.tipAnkete}'`,
          "idNapravio": `${!body.idNapravio ? 'null' : body.idNapravio}`,
          "naziv": `'${body.naziv}'`,
          "opisAnkete": `'${body.opisAnkete}'`,
          "napravioIme": `'${napravioIme.length > 0 ? napravioIme[0].ime + " " + napravioIme[0].prezime: 'null'}'`,
          "idPredmet": `${body.idPredmet}`
        })
        console.log(sql)
        con.query(sql, (err, result) => { 
          if(err) {
            res.json({message: err})
            return;
          }
          res.json({message: "OK"})
        })
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