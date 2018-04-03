'use strict';
const nodemailer = require('nodemailer');
const https = require("https");
const http = require("http");
require('dotenv').config({ path: './.env' });
console.log("THE LOCAL ENV VER ARE: " + JSON.stringify(process.env, null, 2));
const url = "https://api.meetup.com/Atlanta-Outdoor-Club-South/events?key="+process.env.API+"&page=5&omit=description,group,how_to_find_us&sign=true"// - to find today's event ID where urlname 
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
		//body = body[0];
		let todaysEvent = body[0];
		let date = new Date;
		let day = ("0" + date.getDate()).slice(-2);
		let month = ("0" + (date.getMonth() + 1)).slice(-2)
		let todaysDate = date.getFullYear() + "-" + month + "-" + day;
		//Event is confirmed: stone summit  AND  today! ! ! Y E Y
		for (let i=0 ; i<body.length ; i++){
			if ((body[i].venue.name.match(/stone summit/i))&&(todaysDate===body[i].local_date)){
				todaysEvent = body[i];
			}
		}
		body = todaysEvent;
		if ((body.venue.name.match(/stone summit/i)) ) {
			console.error("ITS TODAY");
			let uriComment="The%20list%20of%20RSVPs%20is%20going%20to%20be%20emailed%20to%20Stone%20Summit%20at%205PM%20(the%20day%20of%20the%20event).%20Please%20make%20sure%20to%20RSVP%20here%20beforehand%2C%20or%20special%20admission%20price%20(%2411%20incl.%20gear%20rental)%20cannot%20be%20guaranteed.%0AThank%20you!";
			let event = body.id;
			var options = {
				hostname: "api.meetup.com",
				path: '/Atlanta-Outdoor-Club-South/events/' + event + "/comments/?key="+process.env.API+"&sign=true&comment="+uriComment,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			};
			console.error("ITS NOW "+JSON.stringify(options,null,2));

			const req = http.request(options, (res) => {
				console.log("STATUS: "+JSON.stringify(res.statusCode));
				console.log("HEADERS: "+JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					console.log(`BODY: ${chunk}`);
				});
				res.on('end', () => {
					console.log('No more data in response.');
				});
			});
			req.on('error', (e) => {
				console.error(`problem with request: ${e.message}`);
			});
			req.write('{}');
			req.end();
		}
		//event not a stone summit OR not today?!
		else {
			console.log("Rock Climbing Meetup in SSA is NOT today:( :( :(. Event ID = " + body.id + "name: " + body.venue.name);
			console.log(todaysDate + " Vs. " + body.local_date);
		}
	});
});