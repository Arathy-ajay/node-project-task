var nodemailer=require('nodemailer');
var formidable=require('formidable');
var http=require('http');
var fs=require('fs');
var path=require('path');
var server=http.createServer((req,res)=>{
  if(req.url==='/fileupload' && req.method.toLowerCase()==='post'){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
      if(err){
        res.writeHead(500,{'Content-Type':'text/plain'});
        return res.end('An error occurred during the file upload');
      }
        const oldpath=files.filetoupload[0].filepath;
        const newpath=path.join(process.cwd(),'uploads',files.filetoupload[0].originalFilename);
       
        fs.rename(oldpath,newpath,function(err){    
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'});
                return res.end('An error occurred while moving the file');
            }
        });
        var transport=nodemailer.createTransport({
            host:"sandbox.smtp.mailtrap.io",
            port:2525,
            auth:{
                user:"2dd72a89eba268",
                pass:"91ce0ee770bf31"
            }
        });
        var mailOptions={
            from:'aadil@gmail.com',
            to:'arathy@gmail.com',
            subject:'File Uploaded ',
            text:'A user uploded a file to the support portal!'
        };
        transport.sendMail(mailOptions,function(error,info){
            if(error){
                console.error(error);
                res.writeHead(500,{'Content-Type':'text/plain'});
                return res.end('File uploaded but email failed to send.');
            }
            console.log('Email sent: '+info.response);
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('<h2>File uploaded and admin notified successfully!</h2>');
        });
    });
    }else{  
    
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(`
    <form action="/fileupload" method="post" enctype="multipart/form-data">
    <input type="file" name="filetoupload" multiple><br>
    <input type="submit">
    </form>
    `);
  }
});

server.listen(8080,()=>{
    console.log('Server listening on port 8080');
});
