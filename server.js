const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 7184;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//DB
const mysql = require('mysql');
const discoverLim = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'@rbgus0905',
    database:'discoverLim',
    multipleStatements: true
};

var connection = mysql.createConnection(discoverLim); // DB 커넥션 생성
connection.connect();   // DB 접속
//DB
app.use( express.static( path.join(__dirname, 'client/build') ) );
 
app.get('/*', (req, res) => {
    res.send(path.join(__dirname, '/index.html') );
});



app.post('/signUp', (req, res)=>
{
    var body = req.body;
    console.log(body);
    var sql = `select EXISTS(select * from user_infor where User_Name = ? limit 1) as success;`;
    connection.query(sql, [body.User_Name], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            if (results[0].success == 1) {
                res.send("존재하는 계정이 있습니다.");
            } else {
                //식별번호와 식별번호 확인 체크
                if (body.password == body.password_again) {
                    //회원가입
                    var sql = `INSERT INTO user_infor (User_Name, User_email, User_Password) VALUES(?,?,?)`;
                    connection.query(sql, [ body.nickname, body.email, body.password], function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(body.nickname, body.email, body.password);
                            res.redirect("/");
                            
                        }
                    });
                } else {
                    res.send("비밀번호가 일치하지 않습니다.");
                }
            }
        }
    });
})
app.post('/signIn', (req, res)=>
{
    //console.log(req.body);
    var ID = req.body.email;
    var password = req.body.password;
    var sql = 'select * from user_infor where User_email = ? and User_Password = ?';
    connection.query(sql, [ID, password], function (err, results) {
        if (err) {
            console.log(err);
        }
       else{
           console.log(results);
           if(!results.length)
           {
              res.send("잘못된 아이디, 비밀번호 입니다.");
           }
           else
           {
              res.redirect("/");
           }
       } 
    });
})
//포트 리스닝
app.listen(port, () => {
    console.log('listen on port:' + port);
});


