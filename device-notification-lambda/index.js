'use strict'

const MongoClient = require('mongodb').MongoClient;

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
	getMongoDbConnection(mongoURI).then(dbConn => {
		dbConn.collection('notifications').find({providerid: event.providerid, read: false}, (err, res) => {
			if(err!=null) {
				console.error('an error occurred in createDoc', err);
				callback(null, JSON.stringify(err));
			} else {
				console.log('OK');
				dbConn.collection('notifications').update({providerid: event.providerid, read: false}, {$set: {read: true}}, (err2, res2) => {
					callback(null, JSON.stringify(res));
				});
			}
		});
	});
}
