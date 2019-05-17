
module.exports = function(app, con, db) {
    
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
    else if(result[0].idPredmet!==null) {
      con.query('SELECT naziv FROM Predmet WHERE id = ' + result[0].idPredmet, function(error, result){
        if (error)
        {
          res.json({message: error});
          return;
        }
        res.json({nazivPredmeta: result[0].naziv});
      })
    }
  })
})
app.get('/getDatumIstekaAnkete', function(req, res) {
  con.query('SELECT datumIstekaAnkete FROM Anketa WHERE idAnketa = ' + req.query.idAnketa, function(error, result){
    if (error)
    {
      res.json({message: error});
      return;
    }
    res.json({datumIstekaAnkete: result[0].datumIstekaAnkete});
})
}) 

}