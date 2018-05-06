'use strict'

const MongoClient = require('mongodb').MongoClient;
const Random = require('meteor-random');

let mongoDbConnectionPool = null;
let mongoURI = null;
let mongoDbName = null;

exports.handler = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	if(!mongoURI) {
		mongoURI = process.env.MONGODB_CLUSTER_URI;
	}
	if(!mongoDbName) {
		mongoDbName = process.env.MONGODB_DB_NAME;
	}

	handleEvent(event, context, callback);
};

function getMongoDbConnection(uri) {
	if (mongoDbConnectionPool && mongoDbConnectionPool.isConnected(mongoDbName)) {
		return Promise.resolve(mongoDbConnectionPool.db(mongoDbName));
	}

	return MongoClient.connect(uri, { poolSize: 10 }).then(dbConnPool => {
		mongoDbConnectionPool = dbConnPool;
		return mongoDbConnectionPool.db(mongoDbName);
	});
}

function handleEvent(event, context, callback) {
	event._id = Random.id();
	getMongoDbConnection(mongoURI).then(dbConn => {
		dbConn.collection('ticks').insertOne(event, (err, res) => {
			if(err!=null) {
				console.error('an error occurred in createDoc', err);
				callback(null, JSON.stringify(err));
			} else {
				console.log('OK');
				callback(null, 'SUCCESS');
			}
		});
	});
}
