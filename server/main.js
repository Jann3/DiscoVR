// define VR collection

VR = new Mongo.Collection('VR');

Meteor.startup(function () {
// code to run on server at startup

    if (!VR.findOne()){

      // if nothing in the database create sample dataset

      VR.insert({title: "Elite Dangerous", rift_id: "988773191157765", steam_id: "359320", category: "games", support_rift: true, support_vive: true, singleplayer: true, multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Lucky's Tale", rift_id: "909129545868758", category: "games", support_rift: true, support_vive: false, singleplayer: true, multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Out of Ammo", steam_id: "451840", category: "games", support_rift: false, support_vive: true, singleplayer: true, multiplayer: true, support_gamepad: false, support_motion: true, support_kbm: false});
      VR.insert({title: "Keep Talking and Nobody Explodes", rift_id: "818716001584299", steam_id: "341800", category: "games", support_rift: true, support_vive: true, singleplayer: false, multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "ADR1FT", rift_id: "905830242847405", steam_id: "300060", category: "games", support_rift: true, support_vive: true, singleplayer: true, multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Project CARS", rift_id: "991947850898357", steam_id: "234630", category: "games", support_rift: true, support_vive: true, singleplayer: true, multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Apollo 11 VR", rift_id: "937027946381272", steam_id: "457860", category: "games", support_rift: true, support_vive: true, singleplayer: true, multiplayer: false, support_gamepad: true, support_motion: true, support_kbm: true});
      VR.insert({title: "AltspaceVR", rift_id: "1072303152793390", steam_id: "407060", category: "games", support_rift: true, support_vive: true, singleplayer: false, multiplayer: true, support_gamepad: true, support_motion: true, support_kbm: true});
      VR.insert({title: "The Climb", rift_id: "866068943510454", category: "games", support_rift: true, support_vive: false, singleplayer: true, multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "The Town of Light", steam_id: "433100", category: "games", support_rift: true, support_vive: false, singleplayer: true, multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Raw Data", steam_id: "436320", category: "games", support_rift: false, support_vive: true, singleplayer: true, multiplayer: true, support_gamepad: false, support_motion: true, support_kbm: false});

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

  // Publish entire VR

  Meteor.publish('VR', function(){
    return VR.find({});
  });