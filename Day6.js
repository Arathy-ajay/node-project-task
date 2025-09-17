const fs = require('fs');

fs.writeFile('profile.txt', "Name:Riya\nAge:22\nCity:Mumbai", function (err) {
  if (err) throw err;
  console.log("File created");

  
  fs.readFile('profile.txt', 'utf8', function (err, data) {
    if (err) throw err;

    const firstLine = data.split('\n')[0];           
    const name = firstLine.replace('Name:', '').trim();
    console.log('Name is:', name);

    if (name === 'Riya') {
      console.log("Profile is verified");
    } else {
      console.log("Invalid profile");
    }

    fs.appendFile('profile.txt', '\nStatus:Active', function (err) {
      if (err) throw err;
      console.log("Status added");

      fs.rename('profile.txt', 'verified_profile.txt', function (err) {
        if (err) throw err;
        console.log("File renamed");
      });
    });
  });
});


