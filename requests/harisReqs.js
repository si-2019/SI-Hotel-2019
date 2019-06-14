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
        }).then(anketa => {
          if(body.pitanja) {
            body.pitanja.forEach(pitanje => {
                db.pitanje.create({
                  vrstaPitanja: pitanje.vrstaPitanja,
                  tekstPitanja: pitanje.tekstPitanja,
                  idAnketa: anketa.idAnketa
                }).then(Pitanje => {
                  if(pitanje.odgovori) {
                    pitanje.odgovori.forEach(odgovor => {
                      db.ponudjeniOdgovor.create({
                        idPitanja: Pitanje.idPitanja,
                        tekstOdgovora: odgovor
                      })
                    })
                  }
                })
            })
            res.json({message: "OK"})
          } 
          else {
            res.json({message: "OK"})
          }
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

    app.get('/dederAnkete', (req, res) => {
      db.predmet_student.findAll().then(rez => {
        res.send(rez)
      })
    })


    app.get('/dajMojeAnkete', (req, res) => {
      db.anketa.findAll({
        where: {
          idNapravio: req.query.idNapravio
        }
      }).then(ankete => {
        res.json({ankete})
      }).catch(error => {
        res.json({error})
      })
    })
    
    app.get('/dajPredmete', (req, res) => {
      let idKorisnik = req.query.idKorisnik
      db.predmet.findAll({
        where: {
          [db.Sequelize.Op.or]: {
            idProfesor: idKorisnik,
            idAsistent: idKorisnik
          }
        }
      }).then(predmeti => {
        res.json(predmeti)
      }).catch(error => {
        res.json({error})
      })
    })

    app.get('/dajOsnovno', (req, res) => {
      let idAnketa = req.query.idAnketa
      db.anketa.findOne({
        where: {
          idAnketa
        }
      }).then(anketa => {
        res.json({
          anketa
        }) 
      }).catch(error => {
        res.json({
          error
        })
      })
    })

    app.get('/dajPopunjenuAnketu', (req, res) => {
      let id = req.query.id
      con.query('SELECT * FROM PopunjenaAnketa pa, Anketa a WHERE a.idAnketa = pa.idAnketa AND pa.idPopunjenaAnketa = ' + id, (err, pa) => {
        if(err || pa.length < 1) {
          res.json({error: err})
        } 
        else {
          con.query(`SELECT *, o.tekstOdgovora as odgovor FROM Odgovor o
                    LEFT JOIN PonudjeniOdgovor po
                    ON o.idPonudjeniOdgovor = po.idPonudjeniOdgovor
                    JOIN Pitanje p
                    ON p.idPitanja = o.idPitanje
                    WHERE o.idPopunjenaAnketa = ${id}`,
                    (err, odgovori) => {
                      if(err) {
                        res.json({error: err})
                        return
                      }
                      let odg = {}
                      for(let i = 0; i < odgovori.length; i++) {
                        let o = odgovori[i]
                        odg[o.idPitanja] ? odg[o.idPitanja].push(o) : odg[o.idPitanja] = [o]
                      }
                      let odgArray = []
                      for(let i = 0; i < Object.keys(odg).length; i++) {
                        odgArray.push(odg[Object.keys(odg)[i]])
                      }
                      pa[0].odgovori = odgArray
                      res.json(pa[0])
                    })

        }
      })
    })

}