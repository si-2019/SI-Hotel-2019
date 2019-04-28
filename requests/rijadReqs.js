module.exports = function(app, con) {
    
  app.get('/getKreator', function(req, res) {
      con.query('SELECT napravioIme FROM Anketa WHERE idAnketa = ' + req.body.idAnketa, function(error, result){
        if (error){
          res.json({message: error});
          return;
        }
        res.json({kreator: result[0].napravioIme});
    })
  })

  app.get('/getPopunjenaAnketa', function(req, res) {
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
}