//var database = require("../database.js");

var handlebars = require("express-handlebars").create(require("../configs/handlebars.options.js"));

module.exports = function()
{
	var route = require("express").Router();
	
	route.get("/", function(request, response)
	{
		response.render("tutoring");
	});
	
	//route.use(require("../middleware/has-been-authed.js"));
	
	route.get("/requestion", function(request, response)
	{
		response.render("requestion/first");
	});
	
	route.get("/email", function(request, response)
	{
		handlebars.render("./emails/report_new_requestion.email.handlebars",
		{
			firstname: "Andrew",
			lastname: "McPherson",
			
			reqid: "1234567890"
		})
		.then(function(rendering)
		{
			response.send(rendering);
		},
		function(error)
		{
			console.log(error);
		});
		
	});
	
	return route;
}