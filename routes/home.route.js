module.exports = function()
{
	var route = require("express").Router();
	
	route.get("/", function(request, response, next)
	{
		response.render("home", {layout: "home.layout.handlebars"});
	});
	
	return route;
}