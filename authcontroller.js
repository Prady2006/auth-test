const UserDB  = require('./models/user');
const  PrivacySettingDB  = require('./models/privacySettings');
const jwt = require('jsonwebtoken');

module.exports.localCreate = async (req, res, next) => {
	if (
		req === null ||
		req === undefined ||
		req.body === null ||
		req.body === undefined ||
		!Object.keys(req.body).includes("email") ||
		!Object.keys(req.body).includes("password") ||
		!Object.keys(req.body).includes("fullname") ||
		!Object.keys(req.body).includes("sex") ||
		!Object.keys(req.body).includes("dob")
	) {
		res.status(400);
		return res.json({
			error: true,
			code: 400,
			data: "Query Params Missing",
		});
	}
	try {
		let user = await UserDB.findOne({ email: req.body.email });
		if (user) {
			res.status(406);
			return res.json({
				error: true,
				code: 406,
				data: "User Exists",
			});
		}
		let newUserRecord = {};
		newUserObj(newUserRecord, req.body);
		// let p1 = UserDB.create({
		// 	displayName: req.body.fullname,
		// 	email: req.body.email,
		// 	password: req.body.password,
		// 	emailVerified: false,
		// 	dob: req.body.dob
		// });
		let privacy = await PrivacySettingDB.create({});
		newUserRecord.privacy = privacy;
		let p2 = await UserDB.create(newUserRecord);

		// p2 = await (await p2).toObject();
		// // (await p2).authToken = await auth.createCustomToken((await p1).uid);
		// delete (await p2)._id;
		// delete (await p2).id;
		// delete (await p2).__v;
		// delete (await p2).updatedAt;
		// delete (await p2).privacy._id;
		// delete (await p2).privacy.id;
		// delete (await p2).privacy.__v;
		// delete (await p2).privacy.updatedAt;

		res.status(200);
		return res.json({
			error: false,
			code: 200,
			data: 'User signed up successfully',
		});
	} catch (err) {
		res.status(500);
		return res.json({
			error: err,
			code: 500,
			data: err.message || "Internal Server Error",
		});
	}
};
module.exports.localStart = async (req, res) => {

	try {
		let user = await UserDB.findOne({ email: req.body.email }).populate("privacy");
		if (!user) {
			res.status(204);
			return res.json({
				error: true,
				code: 204,
				data: "No User Found!",
			});
		}
		user = user.toObject();
		let obj = {
            _id: user._id ,
            email: user.email
        }
		delete user._id;
		delete user.id;
		delete user.__v;
		delete user.privacy._id;
		delete user.privacy.id;
		delete user.privacy.__v;
		res.status(200);
	
		return res.json({
			error: false,
			code: 200,
			data: user,
			token: jwt.sign(obj,"failtell" , {expiresIn:  '1000000'})
		});
	} catch (err) {
		res.status(500);
		return res.json({
			error: err,
			code: 500,
			data: err.message || "Internal Server Error",
		});
	}
};
module.exports.end = async (req, res) => {
	if (!process.env.NODE_PROD_FLAG) {
		res.status(200);
		return res.json({
			error: false,
			code: 200,
			data: "Auth Session Closed",
		});
	}
	try {
		let user = await auth.getUserByEmail(req.body.email);
		await req.session.destroy();
		await auth.revokeRefreshTokens(user.uid);
		res.status(200);
		return res.json({
			error: false,
			code: 200,
			data: "Auth Session Closed",
		});
	} catch (err) {
		res.status(500);
		return res.json({
			error: err,
			code: 500,
			data: err.message || "Internal Server Error",
		});
	}
};


module.exports.home = ( req , res ) =>{
    res.status(200).json({
        message: "hurray you have signed in sucessfully"
    })
}

function newUserObj(userRecord, args) {
	if (args.address != null) {
		userRecord.address = args.address;
	}
	if (args.categories != null) {
		userRecord.categories = args.categories;
	}
	if (args.city != null) {
		userRecord.city = args.city;
	}
	if (args.country != null) {
		userRecord.country = args.country;
	}
	if (args.dob != null) {
		userRecord.dob = new Date(args.dob);
	}
	if (args.email != null) {
		userRecord.email = args.email;
	}
	if (args.fullname != null) {
		userRecord.fullname = args.fullname;
	}
	if (args.job != null) {
		userRecord.job = args.job;
	}
	if (args.level != null) {
		userRecord.level = args.level;
	}
	if (args.photo != null) {
		userRecord.photo = args.photo;
	}
	if (args.sex != null) {
		userRecord.sex = args.sex;
	}
}