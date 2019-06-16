var test = require('../testToken')

module.exports = function (app, con, db) {
  /* ovdje se pišu zahtjevi npr.
    app.get('/hotel', function(req, res) {
      res.send('hotel - ankete')  
    })
  */

  app.post('/promijeniDatumIsteka', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      const body = req.body
      console.log(body)

      db.anketa.update({
        datumIstekaAnkete: body.datumIstekaAnkete
      }, {
          where: {
            idAnketa: body.idAnketa
          }
        }).then(response => {
          res.json({ message: "OK" })
        }).catch(error => {
          res.json({ error })
        })
    })
  })

  app.get('/dajAnketeZaProfesora', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      if (!req.query.idProfesor) {
        res.json({ error: "Nije poslan parametar idProfesor" })
        return
      }

      let sql = 'SELECT * FROM Anketa WHERE idNapravio = ' + req.query.idProfesor

      con.query(sql, function (error, result) {
        if (error) {
          res.json({ message: error });
          return;
        }
        res.json({ ankete: result });
      })
    })
  })

  app.get('/dajListuJavnihAnketa', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      let sql = 'SELECT * FROM Anketa WHERE tipAnkete = "javna anketa"'

      con.query(sql, function (error, result) {
        if (error) {
          res.json({ message: error });
          return;
        }
        res.json({ ankete: result });
      })
    })
  })
  app.get('/dajPopunjeneAnkete', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      let sql = 'SELECT PopunjenaAnketa.*, Anketa.* FROM Anketa, PopunjenaAnketa WHERE Anketa.idAnketa = PopunjenaAnketa.idAnketa'

      con.query(sql, function (error, result) {
        if (error) {
          res.json({ message: error });
          return;
        }
        res.json({ ankete: result });
      })
    })
  })
  app.get('/dajPopunjeneAnketeProfesor', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      let idKorisnik = req.query.idKorisnik
      console.log(req.query)
      let sql = 'SELECT PopunjenaAnketa.*, Anketa.* FROM Anketa, PopunjenaAnketa WHERE Anketa.idAnketa = PopunjenaAnketa.idAnketa' +
        ' AND idNapravio = ' + idKorisnik

      con.query(sql, function (error, result) {
        if (error) {
          res.json({ message: error });
          return;
        }
        res.json({ ankete: result });
      })
    })
  })



  app.get('/dajanketezaprofesorapopredmetima', (req, res) => {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      let id = req.query.idKorisnik
      if (!id)
        id = 0
      db.sequelize.query(`SELECT *, p.naziv as nazivPredmeta
                        FROM Predmet p
                        JOIN Anketa a
                        ON ((a.tipAnkete = 'anketa za sve predmete')
                        OR (p.id = a.idPredmet AND a.tipAnkete = 'anketa za predmet'))
                        AND (p.idAsistent = ${id} OR p.idProfesor = ${id})`)
        .then(ankete => {
          ankete = ankete[0]
          let obj = {}
          for (let i = 0; i < ankete.length; i++) {
            let idPredmet = ankete[i].id
            obj[idPredmet] ? obj[idPredmet].ankete.push(ankete[i]) : obj[idPredmet] = {
              nazivPredmeta: ankete[i].nazivPredmeta,
              ankete: [ankete[i]]
            }
          }
          res.json({ ankete: obj })
        })
    })
  })
  app.get('/dajsveanketepopredmetima', (req, res) => {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      db.sequelize.query(`SELECT *, p.naziv as nazivPredmeta
                        FROM Predmet p
                        JOIN Anketa a
                        ON (a.tipAnkete = 'anketa za sve predmete')
                        OR (p.id = a.idPredmet AND a.tipAnkete = 'anketa za predmet')`)
        .then(ankete => {
          ankete = ankete[0]
          let obj = {}
          for (let i = 0; i < ankete.length; i++) {
            let idPredmet = ankete[i].id
            obj[idPredmet] ? obj[idPredmet].ankete.push(ankete[i]) : obj[idPredmet] = {
              nazivPredmeta: ankete[i].nazivPredmeta,
              ankete: [ankete[i]]
            }
          }
          res.json({ ankete: obj })
        })
    })
  })
  app.get('/getpp', function (req, res) {
    db.anketa.findAll({
      where: {
        tipAnkete: 'anketa za predmet'
      }
    }).then(function (result) {
      let predmeti = [0]
      for (let i = 0; i < result.length; i++) {
        predmeti.push(result[i].idPredmet)
      }
      db.predmet.findAll({
        where: {
          id: { [db.Sequelize.Op.in]: predmeti }
        }
      }).then(function (listaPredmeta) {
        let mapa = {}
        for (let i = 0; i < listaPredmeta.length; i++) {
          mapa[listaPredmeta[i].id] = listaPredmeta[i].naziv
        }
        let ankete = {}
        for (let i = 0; i < result.length; i++) {
          let id = result[i].idPredmet
          if (ankete[id]) {
            ankete[id].ankete.push(result[i])
          }
          else {
            ankete[id] = {
              nazivPredmeta: mapa[id],
              ankete: [result[i]]
            }
          }
        }
        res.json({ ankete })
      }).catch(error => {
        res.json({ error })
      })
    }).catch(error => {
      res.json({ error })
    })
  })

  app.get('/dajSveAnketeZaKojePostojeRezultati', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      let idKorisnik = req.query.idKorisnik
      if (!idKorisnik) {
        res.json({ message: "Nije poslan parametar idKorisnik" })
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
        if (uloge[korisnik.idUloga] != 'ADMIN') {
          let table = db.predmet_student
          let attributes = ['idPredmet']
          let Where = {
            idStudent: idKorisnik
          }
          if (uloge[korisnik.idUloga] != 'STUDENT') {
            table = db.predmet
            attributes = ['id']
            Where = {
              [Op.or]: {
                idProfesor: idKorisnik,
                idAsistent: idKorisnik
              }
            }
          }
          where[Op.or] = [{ tipAnkete: 'javna anketa' }]
          table.findAll({
            attributes,
            where: Where
          }).then(predmeti => {
            predmeti = predmeti.map(p => p[attributes[0]]).concat(-1)
            where[Op.or].push({ idPredmet: { [Op.in]: predmeti } })
            db.anketa.findAll({
              where
            }).then(function (ankete) {
              res.json({ ankete })
            }).catch(error => {
              res.json({ error })
            })
          })
        }


      }).catch(error => {
        res.json({ error })
      })
    })
  })

  app.post('/obrisiAnketu', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      let idAnkete = req.query.idAnketa
      let idKorisnika = req.query.idKorisnik
      if (!idAnkete || !idKorisnika) {
        res.json({ error: "Nije poslan jedan od parametara" })
        return
      }
      db.korisnik.findOne({
        where: {
          id: idKorisnika
        }
      }).then(function (rez) {
        if (rez.idUloga == 4) {
          db.anketa.destroy({
            where: {
              idAnketa: idAnkete
            }
          }).then(brojObrisanih =>
            res.json({ message: "Anketa je obrisana" })
          ).catch(error => {
            res.json({ error: "Anketa nije obrisana" })
          })
        }
        db.anketa.findOne({
          where: {
            idAnketa: idAnkete,
            idNapravio: idKorisnika
          }
        }).then(function (rezultat) {
          if (rezultat == null) {
            res.json({ error: "Nema privilegije nad anketom" })
            return
          }
          db.anketa.destroy({
            where: {
              idNapravio: rezultat.idNapravio,
              idAnketa: idAnkete
            }
          }).then(
            res.json({ message: "Anketa je obrisana" })
          ).catch(error => {
            res.json({ error })
          })
        }).catch(error => {
          res.json({ error })
        })
      }).catch(error => {
        res.json({ error })
      })
    })
  })

  app.get('/dajAnketeNaPredmetimaZaStudenta', function (req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      let idStudenta = req.query.idStudent
      if (!idStudenta) {
        res.json({ message: "Nije poslan parametar idStudent" })
        return
      }
      db.predmet_student.findAll({
        where: {
          idStudent: idStudenta
        }
      }).then(function (rez) {
        let predmeti = []
        for (let i = 0; i < rez.length; i++) {
          predmeti.push(rez[i].idPredmet)
        }
        let Op = db.Sequelize.Op
        db.anketa.findAll({
          where: {
            datumIstekaAnkete: {
              [Op.gt]: new Date()
            },
            idPredmet: {
              [Op.in]: predmeti
            }
          }
        }).then(function (result) {
          res.json(result)
        }
        ).catch(error => {
          res.json({ error })
        })
      }).catch(error => {
        res.json({ error })
      })
    })
  })
}
