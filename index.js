const request = require('request');
const requestp =  require('request-promise');
const cheerio = require('cheerio');
const csv = require('csv-parser');
var fs = require('fs');
const SirenRepository = require('./mongoose.js');


const parse_csv = () => {


	var s  = fs.createReadStream('./company_list2.csv')
		  .pipe(csv({
		  	separator: ';',
		  }))
		  .on('data', function (data) {

		  	// Stop streaming.
		  	s.pause();
		  	const object = {
		  		city: data.L7_NORMALISEE,
		  		social_reason: data.L1_NORMALISEE,
		  	};
		    execute_function(object);

		    // Resume streaming.
		    setTimeout(() => {
		    	s.resume();
		    }, 500)
		  })
}


const execute_function = (object) => {


	const CITY = object.city;
	const SOCIAL_REASON = object.social_reason;

	return requestp({
		method:'GET',
		url:`https://www.google.fr/search`,
		qs: {q: `${CITY} ${SOCIAL_REASON}`},
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
			referer: 'https://www.google.fr/',
			'x-chrome-uma-enabled': 1, 
			'x-client-data': 'CI62yQEIprbJAQjBtskBCPqcygEIqZ3KAQiCn8oBCKijygE=',
		},
			proxy: 'http://localhost:8888',
			tunnel: false,
		transform: (response) => cheerio.load(response),
	})
		.then(response => {
			const first = response('cite._Rm').first().text();
			return SirenRepository
				.then(Siren => {
					const sir = new Siren({name: SOCIAL_REASON, city: CITY, website:first });
					return sir.save()
						.then(() => {
							console.log(`${SOCIAL_REASON} added to MongoDB`);
						});
				})

		});
}
parse_csv();