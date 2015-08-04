var express = require('express');
var app = express();
var mysql = require('mysql');


app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/style',  express.static(__dirname + '/style'));
app.use('/script',  express.static(__dirname + '/script'));

app.get('/',function(req,res){
	res.sendFile('home.html',{'root': __dirname + '/templates'});
})

app.get('/showSignInPage',function(req,res){
	res.sendFile('signin.html',{'root': __dirname + '/templates'});
})

app.get('/showSignUpPage',function(req,res){
  res.sendFile('signup.html',{'root':__dirname + '/templates'})
})

app.post('/signin',function(req,res){

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'NodeListDb'
    });

    connection.connect();

    connection.query('CALL sp_Authenticate("jay","jay")', function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0]);
    });

    connection.end();
})

app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});
