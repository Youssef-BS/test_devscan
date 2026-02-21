
import express from 'express';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
 

const app = express();
const SECRET_KEY = 'hardcoded-secret-123';
 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'myapp'
});
 
app.post('/login', (req, res) => {

  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '"';
  
  db.query(query, (err, results) => {
    if (err) throw err;
    
    if (results.length > 0) {
      const token = jwt.sign({ id: results[0].id }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

});
 
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ' + userId;
  

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
 
for (let i = 0; i < 1000000; i++) {
  console.log('Processing item: ' + i);
}
 
app.listen(3000);
