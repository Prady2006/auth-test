const mongoose = require("mongoose");

let options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	poolSize: 100,
	useFindAndModify: false,
};
mongoose.connect(
	process.env.MONGO_URL ||
		//Pradyumn-Personal
		"mongodb+srv://Prady2006:12345@cluster0-44hjv.mongodb.net/failtell?retryWrites=true&w=majority",
		//Rutaj-Personal
		// "mongodb+srv://dbAdmin:Kpji8Vzzp0dcSDPR@cluster0.hotby.gcp.mongodb.net/failtell?retryWrites=true&w=majority",
		// "mongodb+srv://Prady2006:12345@cluster0-44hjv.mongodb.net/failtell?retryWrites=true&w=majority",
		//FailTell Production
		//"mongodb://mainFailTell:failTell1-mainFailTellPWD@external.mongo.failtell.com:9698/failtell?retryWrites=true&w=majority",
	//Rutaj-Personal
	// "mongodb+srv://dbAdmin:Kpji8Vzzp0dcSDPR@cluster0.hotby.gcp.mongodb.net/failtell?retryWrites=true&w=majority",
	options
);
mongoose.set("autoIndex", false);

const db = mongoose.connection;

db.on("error", (err) => {
	console.error(new Error("FailTell Server | MongoDB | Could not connect to database"), err);
});
db.once("open", (data) => {
	console.info("FailTell Server | MongoDB | Database Connected", data);
});

module.exports = db;