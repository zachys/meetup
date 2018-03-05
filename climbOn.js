'use strict';
const nodemailer = require('nodemailer');
const https = require("https");
require('dotenv').config({ path: './.env' });
console.log("THE LOCAL ENV VER ARE: "+JSON.stringify(process.env,null,2));
const url = "https://api.meetup.com/Atlanta-Outdoor-Club-South/events?&page=1&omit=description,group,how_to_find_us"// - to find today's event ID where urlname 
//https://api.meetup.com/Atlanta-Outdoor-Club-South/events?&sign=true&photo-host=public&page=2&photo-host=public&page=2
https.get(url, res => {
	res.setEncoding("utf8");
	let body = "";
	res.on("data", data => {
	body += data;
	});
	res.on("end", () => {
	body = body;
	console.error(body);
	body = JSON.parse(body);
	body = body[0];
	let date = new Date;
	let day = ("0" + date.getDate()).slice(-2);
	let month = ("0" + (date.getMonth() + 1)).slice(-2)
	let todaysDate = date.getFullYear()+"-"+month+"-"+day;
	//Event is confirmed: stone summit AND today!!! YEY
	if ((body.venue.name.match(/stone summit/i))&&(todaysDate===body.local_date)){
	//if ((body.venue.name.match(/stone summit/i))&&(todaysDate!==body.local_date)){
		console.log("Rock Climbing Meetup in SSA is today!!!. Event ID = "+body.id);
		const url = "https://api.meetup.com/Atlanta-Outdoor-Club-South/events/"+body.id+"/rsvps?&omit=event,group,member.photo,venue,member.bio";
		https.get(url, res => {
			res.setEncoding("utf8");
			let body = "";
			res.on("data", data => {
			body += data;
			});
			res.on("end", () => {
			body = body;
			console.debug(body);
			body = JSON.parse(body);
			var emailBody = "<h1>TEST EMAIL!<br>Today's ("+todaysDate+") participants in the meetup are as followed: </h1><br>";
			for (var member in body){
				emailBody += "<b>"+body[member].member.name+"</b><br>";
			}
			console.log(emailBody);
			emailNow(process.env,emailBody);
			});
		});
	  }
	  //event not a stone summit OR not today?!
	  else{
		console.log("Rock Climbing Meetup in SSA is NOT today:( :( :(. Event ID = "+body.id);
		console.log(todaysDate+" Vs. "+body.local_date);

	  }
	});
  });
var emailNow = function(env,mailBody){
    let transporter = nodemailer.createTransport({
			service : 'gmail',
        auth: {
            user: env.ZackEmail, 
            pass: env.ZackEmailPassword 
        }
    });

//     // setup email data with unicode symbols
    let mailOptions = {
        from: '"Zack Str" <'+env.ZackEmail+'>', // sender address
        to: env.emailTo, // list of receivers
        cc: env.emailCC, // list of CC
        bcc: env.emailBCC, // list of BCC
        subject: env.emailSubject, // Subject line
        html: mailBody // html body
    };

//     // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}