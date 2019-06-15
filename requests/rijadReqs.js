var test = require('../testToken')

module.exports = function(app, con, db) {
    

    app.get('/getKreator', function(req, res) {
      con.query('SELECT napravioIme FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function(error, result){
        if (error)
        {
          res.json({message: error});
          return;
        }
        res.json({kreator: result[0].napravioIme});
    })
  })

  app.get('/getPopunjenaAnketa', function(req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
      var svaPitanja = [];
      con.query('SELECT idAnketa FROM PopunjenaAnketa where idPopunjenaAnketa = ' + req.body.idPopunjenaAnketa, function(error, anketaResult){
        if (error){
          res.json({message: error});
          return;
        }
        con.query('SELECT idPitanja, vrstaPitanja, tekstPitanja FROM Pitanje WHERE idAnketa = ' + anketaResult[0].idAnketa, function(error, resultPitanja){
          if (error){
            res.json({message: error});
            return;
          }
          for (var pitanje in resultPitanja){
            var pitanjeOdgovori = [];
            con.query('SELECT tekstOdgovora, idPonudjeniOdgovor FROM Odgovor WHERE idPitanje = ' + pitanje.idPitanja, function(error, resultOdgovori){
              if (error){
                res.json({message: error});
                return;
              }
              if (pitanje.vrstaPitanja == "textbox" || pitanje.vrstaPitanja == "star-rating"){
                pitanjeOdgovori.push({tekstPitanja: pitanje.tekstPitanja, odgovor: resultOdgovori[0].tekstOdgovora});
              }
              else{
                var odgovoriP = [];
                for (var resOdgovor in resultOdgovori){
                  con.query('SELECT tekstOdgovora FROM PonudjeniOdgovor WHERE idPonudjeniOdgovor = ' + resOdgovor.idPonudjeniOdgovor, function(error, resultPonudjeni){
                    if (error){
                      res.json({message: error});
                      return;
                    }
                    odgovoriP.push(resultPonudjeni[0].tekstOdgovora);
                  })
                }
                if(pitanje.vrstaPitanja == "single-choice") pitanjeOdgovori.push({tekstPitanja: pitanje.tekstPitanja, odgovor: odgovoriP[0]});
                else pitanjeOdgovori.push({tekstPitanja: pitanje.tekstPitanja, odgovori: odgovoriP});
              }
            })
            svaPitanja.push(pitanjeOdgovori);
          }
        })
      })
      res.json({pitanja: svaPitanja});
  })
})


  app.get('/getRezultatiAnkete', function(req, res) {
    test(req.query.username, req.header('Authorization'), req, res, (req, res) => {
    db.pitanje.findAll({
      where: {
        idAnketa: req.query.idAnketa
      }
    }).then(pitanja => {
      db.sequelize.query('Select *, o.tekstOdgovora as textBoxStarRatingOdgovor from Odgovor o join Pitanje p on o.idPitanje = p.idPitanja left join PonudjeniOdgovor po on o.idPonudjeniOdgovor = po.idPonudjeniOdgovor join PopunjenaAnketa pa on pa.idPopunjenaAnketa = o.idPopunjenaAnketa where pa.idAnketa = ' + req.query.idAnketa)
        .then(odgovori => {
          var sviOdgovori = odgovori[0]
          var Pitanja = [];

          for (var index in sviOdgovori){
            var item = sviOdgovori[index];
            var novoPitanje = true;
            var text = "";
            if(item.vrstaPitanja == "textbox" || item.vrstaPitanja == "star-rating") text = item.textBoxStarRatingOdgovor;
            else text = item.tekstOdgovora;

            for (var i=0;i<Pitanja.length;i++){
              if(item.idPitanje == Pitanja[i].idPitanja){
                Pitanja[i].brojOdgovora++;
                novoPitanje = false;
                var noviOdgovor = true;
                for(var j=0;j<Pitanja[i].odgovori.length;j++){
                  if(text == Pitanja[i].odgovori[j].odgovor){
                    noviOdgovor = false;
                    Pitanja[i].odgovori[j].count++;
                    if(Pitanja[i].odgovori[j].count > Pitanja[i].odgovori[Pitanja[i].prosjecniIndex].count){
                      Pitanja[i].prosjecniIndex = j;
                      Pitanja[i].prosjecniOdgovor = Pitanja[i].odgovori[j].odgovor;
                    }
                  }
                }
                if(noviOdgovor){
                  Pitanja[i].odgovori.push({odgovor: text, count: 1, postotak: 100});
                }
              }
            }
            if(novoPitanje){
              var odg = [];
              odg.push({odgovor: text, count: 1, postotak: 100});
              Pitanja.push({idPitanja: item.idPitanje, tekstPitanja: item.tekstPitanja, vrstaPitanja: item.vrstaPitanja, prosjecniOdgovor: odg[0].odgovor, prosjecniIndex: 0, brojOdgovora: 1, odgovori: odg});
            }
          }
          for (var i=0;i<Pitanja.length;i++){
            for (var j=0;j<Pitanja[i].odgovori.length;j++){
              var post = (Pitanja[i].odgovori[j].count / Pitanja[i].brojOdgovora) * 100;
              post = post.toFixed(1);
              Pitanja[i].odgovori[j].postotak = post;
            }
          }

          res.json(Pitanja);
        }).catch(error => {

        })
    }).catch(error => {
      res.json({error})
    })
  })
})
}