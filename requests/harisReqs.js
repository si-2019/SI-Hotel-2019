module.exports = function(app, con) {
    /* ovdje se pišu zahtjevi npr.
      app.get('/hotel', function(req, res) {
        res.send('hotel - ankete')  
      })
    */
    app.get('/hotel', function(req, res){
      res.send('nesto bzvz')
    })
    

    function insertSQL(table, obj) {
      return `INSERT INTO ${table}(${Object.keys(obj).toString()}) VALUES (${Object.values(obj).toString()})`
    }

    app.post('/createAnketa', function(req, res) {
      const body = req.body
      let sql = insertSQL('Anketa', {
        "napravioIme": `'${body.napravioIme}'`,
        "datumIstekaAnkete": `DATE('${body.datumIstekaAnkete}')`,
        "datumKreiranja": "NOW()",
        "tipAnkete": `'${body.tipAnkete}'`
      })
      console.log(sql)
      con.query(sql, (err, result) => {
        if(err) {
          res.json({message: err})
          return;
        }
        res.json({message: "OK"})
      })
    })

}