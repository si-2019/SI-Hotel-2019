module.exports = function(app, con) {
    
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
}