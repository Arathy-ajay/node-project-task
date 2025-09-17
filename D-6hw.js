var http=require('http');
var fs=require('fs');
var server=http.createServer(function(req,res){
fs.writeFile('users.txt','welcome john',function(err){
if(err) throw err;
console.log('file created');

checkUser();    
});

function checkUser(){
fs.readFile('users.txt','utf8',function(err,data){
if(err) throw err;
if(data==='welcome john'){
console.log('valid user');
}
else{
console.log('unknown user');
}
});
}
});