module.exports = function(passport, database)
{
	var route = require("express").Router();
	
	route.get("/", function(request, response, next)
	{
		response.render("home");
	});
	
	return route;
}