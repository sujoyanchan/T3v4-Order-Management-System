const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'oms',
	timezone:'Z'
});

app.post('/save', (req, res) => {
	let data = [ req.body.name, req.body.phone, req.body.email, req.body.delivery, req.body.items, req.body.showTime ];
	let sql = 'insert into orders values(?, ?, ?, ?, ?, ?)' ;
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
})

app.get('/show', (req, res) => {
	let sql = 'select * from orders order by date desc' ;
	con.query(sql, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
})	

app.delete('/remove', (req, res) => {
	let data = [ req.body.name ];
	let sql = 'delete from orders where name = ?' ;
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});
})	

app.post('/login', (req,res) => {
    let data=[req.body.username, req.body.password];
    let sql='select * from admin where username = ? and password = ?';
    con.query(sql, data, (err, result)=>{
        if (err)                res.send(err);
        if (result.length>0)    res.send(result);  
        else                    res.send('Wrong username/password combination')    
    });
})

app.listen(9000, () => { console.log('server ready @ 9000'); });
