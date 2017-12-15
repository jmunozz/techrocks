const request = require('request');
const requestp =  require('request-promise');
const cheerio = require('cheerio');



const social_reason = 'bearstudio';
const city = 'ROUEN';


requestp(`https://www.google.fr/search?q=${social_reason}+${city}`)
	.then(response => {
		response = response.body;
		console.log(response);
	});