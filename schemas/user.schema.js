var mongoose = require("mongoose");

var uuid = require("node-uuid");
var bcrypt = require("bcrypt-nodejs");

var user = mongoose.Schema({
	
	utcid:
	{
		type: String,
		required: true
	},
	password:
	{
		type: String,
		required: true
	},
	firstname:
	{
		type: String,
		required: true
	},
	lastname:
	{
		type: String,
		required: true
	},
	joindate:
	{
		type: Date,
		required: true,
		default: Date.now
	},
	verified:
	{
		status:
		{
			type: Boolean,
			default: false,
			required: true
		},
		token:
		{
			type: String,
			expires: 10
		}
	}
});

user.pre("save", function(next)
{
	if(this.verified.status == false)
	{
		this.verified.token = uuid.v4();
	}
	
	if(this.isModified("password"))
	{
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
	}
	
	next();
});

user.methods.isValidPassword = function(password)
{
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("users", user);