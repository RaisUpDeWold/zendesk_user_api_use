var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ZenDesk = require('zendesk-node-api');
var expect = require('chai').expect;

var app = express();
var zendesk = new ZenDesk({
  url: 'https://openbusiness.zendesk.com',
  email: 'openbusiness@openworld.co.ke',
  token: 'L343RpPWXLVQ83DD4f6evYRqnIPhenRr2BxKAtIQ'
})

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/createEndUser', function (req, res) {
  var firstName = req.body.createEndUser_FirstName;
  var lastName = req.body.createEndUser_LastName;
  var email = req.body.createEndUser_EMail;
  var phone = req.body.createEndUser_Phone;
  var businessName = req.body.createEndUser_BusinessName;

  zendesk.users.create({
    email: email,
    name: firstName + ' ' + lastName,
    phone: phone,
    verified: true,
    role: "end-user",
    locale: businessName
  }).then(function (data) {
    expect(data).to.exist;
    expect(data.user.email).to.equal(email);
    res.json({ error_code:0, err_desc:null, data: 'Successful' });
    return;
  }).catch (function (err) {
    console.log(err);
    res.json({error_code:1,err_desc:err});
    return;
  });
  return;
});

app.post('/modifyEndUser', function (req, res) {
  var userID = req.body.modifyEndUser_UserID;
  var firstName = req.body.modifyEndUser_FirstName;
  var lastName = req.body.modifyEndUser_LastName;
  var email = req.body.modifyEndUser_EMail;
  var phone = req.body.modifyEndUser_Phone;
  var businessName = req.body.modifyEndUser_BusinessName;

  zendesk.users.update(userID, {
    email: email,
    name: firstName + ' ' + lastName,
    phone: phone,
    locale: businessName
  }).then(function (data) {
    expect(data).to.exist;
    expect(data.user.email).to.equal(email);
    res.json({ error_code:0, err_desc:null, data: 'Successful' });
    return;
  }).catch (function (err) {
    console.log(err);
    res.json({error_code:1,err_desc:err});
    return;
  });
  return;
});

app.post('/deleteEndUser', function (req, res) {
  var userID = req.body.deleteEndUser_UserID;

  zendesk.users.delete(userID).then(function (result) {
    expect(result).to.be.true;
    res.json({ error_code:0, err_desc:null, data: 'Successful' });
    return;
  }).catch (function (err) {
    console.log(err);
    res.json({error_code:1,err_desc:err});
    return;
  });
  return;
});

var port = process.env.PORT || '3000';

app.listen(port, function () {
  console.log('Running on ' + port + '...');
});
