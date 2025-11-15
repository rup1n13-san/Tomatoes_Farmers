import mongoose from 'mongoose';

const MongoURL = process.env.MongoURL;

if (!MongoURL) {
	throw new Error('Please define the MongoURL environment variable');
}


let cached = global.mongoose;
//check if there is already an existing connection the global variable mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const connectionDatabase = async () => {
    //if there is already a connection return it 
	if (cached.conn) {
		return cached.conn;
	}

	try {
        //if there isn't any connection attempt proceed and create a new connection
		if (!cached.promise) {
			cached.promise = mongoose.connect(MongoURL).then((mongoose) => {
				return mongoose;
			});
		}
		cached.conn = await cached.promise;
		console.log('Connection to the database');
		return cached.conn;
	} catch (err) {
        global.mongoose = { conn: null, promise: null };
		console.log(err);
	}
};

export default connectionDatabase;
