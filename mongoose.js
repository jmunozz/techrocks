const mongoose = require('mongoose');
const Promise = require('bluebird');


const USER = 'techrocks';
const PWD = 'techrocks';
const mongo_uri = `mongodb://${USER}:${PWD}@ds141796.mlab.com:41796/techrocks`;
var opts = { useMongoClient: true };

let  Siren;

const mongoose_setup = () => {

	mongoose.Promise = require('bluebird');

	return mongoose.connect(mongo_uri, opts)
		.then(() => {
			const Siren = mongoose.model('Siren', {
				name: String,
				city: String,
				website: String,
			});
			return Siren;
		})
};

module.export = mongoose_setup();
