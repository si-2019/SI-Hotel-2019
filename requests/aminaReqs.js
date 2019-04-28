
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
}