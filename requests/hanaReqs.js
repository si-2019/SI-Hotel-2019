module.exports = function(app, con) {
    /* ovdje se pišu zahtjevi npr.
      app.get('/hotel', function(req, res) {
        res.send('hotel - ankete')  
      })
    */

   app.post('/promijeniDatumIsteka', function(req, res) {
    const body = req.body

    let sql = "UPDATE Anketa SET datumIstekaAnkete = " + body.datumIstekaAnkete + "WHERE naziv = " + body.naziv
 
    con.query(sql, (err, result) => {
      if(err) {
        res.json({message: err})
        return;
      }
      res.json({message: "OK"})
    })
  })

  app.get('/dajAnketeZaProfesora',function(req,res){

  let sql='SELECT naziv FROM Anketa WHERE idNapravio = ALL (SELECT id FROM Korisnik WHERE idUloga = 3)'

    con.query(sql, function(error, result){
      if (error)
      {
        res.json({message: error});
        return;
      }
      res.json({ankete: result});
  })
  })

}