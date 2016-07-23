// define VR collection

VR = new Mongo.Collection('VR');

Meteor.startup(function () {
// code to run on server at startup

    if (!VR.findOne()){

      // if nothing in the database create sample dataset

      VR.insert({title: "Elite Dangerous", rift_id: "988773191157765", steam_id: "359320", category: "games", support_rift: true, support_vive: true, singleplayer: true, multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});

      console.log('inserted sample data');
      
    } // FindOne 

}); // End startup


// HTTP GET from oculus for Rift

HTTP.call('GET',
          'https://www.oculus.com/experiences/rift/',
          { headers: { 'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'},
          followRedirects: false }, function(error, response){

  if (error){
    console.log(error);
  } else {

    // load response into cheerio

    var $ = cheerio.load(response.content);

    // search for Browse all

    var browseAll = $('._4my5:contains("Browse all")').html();

    console.log(browseAll);

    }
  }); // End HTTP GET
