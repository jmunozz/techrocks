const request = require('request');
const requestp =  require('request-promise');
const cheerio = require('cheerio');



const social_reason = 'blablacar';
const city = 'PARIS';


requestp({
	method:'GET',
	url:`https://www.google.fr/search`,
	qs: {q: `${city} ${social_reason}`},
	headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'},
	transform: (response) => cheerio.load(response),
})
	.then(response => {
		const first = response('cite._Rm').first().text();
		console.log(first);
	});