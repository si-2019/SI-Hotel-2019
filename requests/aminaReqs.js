
module.exports = function(app, con) {
    
  app.get('/getDatumKreiranjaAnkete', function(req, res) {
    con.query('SELECT datumKreiranja FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function(error, result){
      if (error)
      {
        res.json({message: error});
        return;
      }
      res.json({datumKreiranja: result[0].datumKreiranja});
  })
}) 
app.get('/getTipAnkete', function(req, res) {
  con.query('SELECT tipAnkete FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function(error, result){
    if (error)
    {
      res.json({message: error});
      return;
    }
    res.json({tipAnkete: result[0].tipAnkete});
  })
})

app.get('/getPredmet', function(req, res) {
  con.query('SELECT idPredmet FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function(error, result){
    if (error)
    {
      res.json({message: error});
      return;
    }
    con.query('SELECT naziv FROM Predmet WHERE id = ' + result[0].idPredmet, function(error, result){
      if (error)
      {
        res.json({message: error});
        return;
      }
      res.json({nazivPredmeta: result[0].naziv});
    })
  })
})

}