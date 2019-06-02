module.exports = function (app, con, db) {
  app.get('/getDatumKreiranjaAnkete', function (req, res) {
    con.query('SELECT datumKreiranja FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function (error, result) {
      if (error) {
        res.json({ message: error });
        return;
      }
      res.json({ datumKreiranja: result[0].datumKreiranja });
    })
  })
  app.get('/getTipAnkete', function (req, res) {
    con.query('SELECT tipAnkete FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function (error, result) {
      if (error) {
        res.json({ message: error });
        return;
      }
      res.json({ tipAnkete: result[0].tipAnkete });
    })
  })

  app.get('/getPredmet', function (req, res) {
    con.query('SELECT idPredmet FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function (error, result) {
      if (error) {
        res.json({ message: error });
        return;
      }
      else if (result[0].idPredmet !== null) {
        con.query('SELECT naziv FROM Predmet WHERE id = ' + result[0].idPredmet, function (error, result) {
          if (error) {
            res.json({ message: error });
            return;
          }
          res.json({ nazivPredmeta: result[0].naziv });
        })
      }
      else {
        res.json({ message: "Anketa nije anketa za predmet" })
      }
    })
  })
  app.get('/getDatumIstekaAnkete', function (req, res) {
    con.query('SELECT datumIstekaAnkete FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function (error, result) {
      if (error) {
        res.json({ message: error });
        return;
      }
      res.json({ datumIstekaAnkete: result[0].datumIstekaAnkete });
    })
  })

  app.get('/getAnketa', (req, res) => {
    let id = req.query.id
    db.anketa.findOne({
      where: {
        idAnketa: id
      }
    }).then(anketa => {
      db.sequelize.query(`select *, p.idPitanja as pitanjeId
                         from Pitanje p
                         left join PonudjeniOdgovor po
                         on p.idPitanja = po.idPitanja
                         where idAnketa = ${id}
                   `).then(po => {
        po = po[0]
        let pitanja = {}
        for (let i = 0; i < po.length; i++) {
          let obj = po[i]
          if (typeof pitanja[obj.pitanjeId] == 'undefined') {
            console.log("aa", obj)
            pitanja[obj.pitanjeId] = {
              idPitanja: obj.pitanjeId,
              vrstaPitanja: obj.vrstaPitanja,
              tekstPitanja: obj.tekstPitanja
            }
          }
          if (obj.tekstOdgovora != null) {
            typeof pitanja[obj.pitanjeId].odgovori == 'undefined' ?
              pitanja[obj.pitanjeId].odgovori = [{ id: obj.idPonudjeniOdgovor, textOdgovora: obj.tekstOdgovora }] :
              pitanja[obj.pitanjeId].odgovori.push({ id: obj.idPonudjeniOdgovor, textOdgovora: obj.tekstOdgovora })
          }
        }
        res.json(pitanja)
      }).catch(error => res.json({ error }))
    }).catch(error => res.json({ error }))
  })


  app.post('/popuniAnketu', function (req, res) {
    const body = req.body
    console.log(body);
    db.anketa.findOne({
      where: {
        idAnketa: body.idAnketa
      }
    }).then(popunjenaAnketa => {
      db.popunjenaAnketa.create({
        idAnketa: popunjenaAnketa.idAnketa,
        idPopunio: body.idPopunio,
        vrijemePopunjavanja: body.vrijemePopunjavanja,
      }).then(kreirano => {
        if (body.odgovori) {
          body.odgovori.forEach(odgovor => {
            db.odgovor.create({
              idPopunjenaAnketa: kreirano.idPopunjenaAnketa,
              idPitanje: odgovor.idPitanja,
              idPonudjeniOdgovor: odgovor.idPonudjeniOdgovor,
              tekstOdgovora: odgovor.tekstOdgovora
            })
          })
        }
        res.json({ message: "OK" })
      }).catch(error => {
        console.log("errr", error);
        res.json({ error })
      })
    }).catch(error => {
      console.log("errr1", error);
      res.json({ error })
    })

  })

}