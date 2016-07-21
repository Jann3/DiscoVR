Meteor.startup(function () {
// code to run on server at startup

	// HTTP GET from oculus for Rift
	
    HTTP.call('GET', 'https://www.oculus.com/experiences/rift/', {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}, followRedirects: false }, function(error, response){
	if (error){
		console.log(error);
	} else {

		// load response into cheerio

		var $ = cheerio.load(response.content);

		// search for Browse all

		var browseAll = $('._4my5:contains("Browse all")').html();

		console.log(browseAll);

		}
	});
});
