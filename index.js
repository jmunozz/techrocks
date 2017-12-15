const request = require('request');
const requestp =  require('request-promise');
const cheerio = require('cheerio');
const csv = require('csv-parser');
var fs = require('fs');



const social_reason = 'blablacar';
const city = 'PARIS';


const parse_csv = () => {


	fs.createReadStream('./company_list2.csv')
		  .pipe(csv({
		  	separator: ';',
		  }))
		  .on('data', function (data) {

		  	const object = {
		  		city: data.L7_NORMALISEE,
		  		social_reason: data.L1_NORMALISEE,
		  	};
		    execute_function(object);
		  })
}


const execute_function = (object) => {

	return requestp({
		method:'GET',
		url:`https://www.google.fr/search`,
		qs: {q: `${object.city} ${object.social_reason}`},
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
			cookie: 'CONSENT=YES+FR.fr+20150622-23-0; GOOGLE_ABUSE_EXEMPTION=ID=f5d2e8cfead261ad:TM=1513372578:C=r:IP=62.210.32.10-:S=APGng0vzl7jhe5I3npzAwE16hNLEjyGPRg; NID=119=T8GWh2B0OsB6QIkgFo8czTUqJwHiskGq8zB1dBx_IryYZK2hNkBuRr3Cup4JBQTnrE2xm0aM-d2cK5628epNlyNjQSfMI2JYxeqeH3pwZ77acCzMOyNR0qKyCOUCYgYYt3ItyciDjKE; 1P_JAR=2017-12-15-21; DV=s0kMtyZXXU0aQEM5aA8dXBiBaeHABRY; UULE=a+cm9sZToxIHByb2R1Y2VyOjEyIHByb3ZlbmFuY2U6NiB0aW1lc3RhbXA6MTUxMzM3MjkyMDkyMjAwMCBsYXRsbmd7bGF0aXR1ZGVfZTc6NDg4OTY0MjY3IGxvbmdpdHVkZV9lNzoyMzE4NjY4MX0gcmFkaXVzOjE3MzYw',
			referer: 'https://www.google.fr/',
			'x-chrome-uma-enabled': 1, 
			'x-client-data': 'CI62yQEIprbJAQjBtskBCPqcygEIqZ3KAQiCn8oBCKijygE=',
		},
		opts: {
			proxy: 'http://localhost:8888',
			tunnel: false,
		}
		transform: (response) => cheerio.load(response),
	})
		.then(response => {
			const first = response('cite._Rm').first().text();
			console.log(first);
		});

}



parse_csv();