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
      let cols = "", vals = ""
      
      return `INSERT INTO ${table}(${Object.keys(obj).toString()}) VALUES (${Object.values(obj).toString()})`
    }

    app.post('/createAnketa', function(req, res) {
      const body = req.body
      let sql = insertSQL('Anketa', {
        "napravioIme": "'ahmo'",
        "datumIstekaAnkete": "DATE('2018-07-15')",
        "datumKreiranja": "NOW()",
        "tipAnkete": "'javna anketa'"
      })
      console.log(sql)
      con.query(sql, (err, result) => {
        res.json({message: "OK"})
      })
    })

}