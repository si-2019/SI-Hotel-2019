module.exports = function(app, con) {
    /* ovdje se pišu zahtjevi npr.
      app.get('/hotel', function(req, res) {
        res.send('hotel - ankete')  
      })
    */
    
    app.get('/hotel', function(req, res){
      res.send('nesto bzvz')
    })
    
    con.query('select * from Anketa', (err, res) => {
      console.log(err, res[0].naziv)
  })
  

}