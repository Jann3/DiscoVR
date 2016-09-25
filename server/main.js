import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// import VR collection and subscribe
import { VR } from '../lib/collections.js';

'use strict';

Meteor.startup(function () {
// code to run on server at startup


    // if no users
    if (Meteor.users.find().count() === 0){

      // *******************************************
      // ** NEVER deploy without changing this !! **
      // *******************************************
      // these credentials are for admin login/testing
      // change these to your own before deploying
 
      Accounts.createUser({
        username: "Test",
        email: "test@test.com",
        password: "test123",
      });
    }
    // end test account



    if (!VR.findOne()){

      // if nothing in the database create sample dataset

      VR.insert({title: "Elite Dangerous", rift_id: "988773191157765", steam_id: "359320", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Lucky's Tale", rift_id: "909129545868758", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Out of Ammo", steam_id: "451840", category: "games", support_rift: false, support_vive: true, support_singleplayer: true, support_multiplayer: true, support_gamepad: false, support_motion: true, support_kbm: false});
      VR.insert({title: "Keep Talking and Nobody Explodes", rift_id: "818716001584299", steam_id: "341800", category: "games", support_rift: true, support_vive: true, support_singleplayer: false, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "ADR1FT", rift_id: "905830242847405", steam_id: "300060", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Project CARS", rift_id: "991947850898357", steam_id: "234630", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Apollo 11 VR", rift_id: "937027946381272", steam_id: "457860", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: true, support_kbm: true});
      VR.insert({title: "AltspaceVR", rift_id: "1072303152793390", steam_id: "407060", category: "games", support_rift: true, support_vive: true, support_singleplayer: false, support_multiplayer: true, support_gamepad: true, support_motion: true, support_kbm: true});
      VR.insert({title: "The Climb", rift_id: "866068943510454", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "The Town of Light", steam_id: "433100", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Raw Data", steam_id: "436320", category: "games", support_rift: false, support_vive: true, support_singleplayer: true, support_multiplayer: true, support_gamepad: false, support_motion: true, support_kbm: false});
      VR.insert({title: "Radial-G: Racing Revolved", rift_id: "1138122202866373", steam_id: "330770", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "DiRT Rally", rift_id: "992124094188963", steam_id: "310560", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Time Machine VR", rift_id: "1092474780792679", steam_id: "356180", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: true, support_kbm: false});
      VR.insert({title: "Job Simulator", steam_id: "448280", category: "games", support_rift: false, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: false, support_motion: true, support_kbm: false});
      VR.insert({title: "VR Karts", rift_id: "810580345737938", steam_id: "422640", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: true, support_kbm: false});
      VR.insert({title: "The Lab", steam_id: "450390", category: "games", support_rift: false, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: false, support_motion: true, support_kbm: false});
      VR.insert({title: "Space Pirate Trainer", steam_id: "418650", category: "games", support_rift: false, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: false, support_motion: true, support_kbm: false});
      VR.insert({title: "Pool Nation VR", steam_id: "269170", category: "games", support_rift: false, support_vive: true, support_singleplayer: true, support_multiplayer: true, support_gamepad: false, support_motion: true, support_kbm: false});
      VR.insert({title: "Mountain Goat Mountain", rift_id: "1250080495017274", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Chronos", rift_id: "929508627125435", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Edge of Nowhere", rift_id: "1026648920729545", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "The Assembly", rift_id: "1268071846552963", steam_id: "497990", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "ARK: Survival Evolved", steam_id: "346110", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "EVE: Valkyrie", rift_id: "775907692521284", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Rooms: The Unsolvable Puzzle", rift_id: "828122903980238", steam_id: "331460", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: true, support_kbm: false});
      VR.insert({title: "Subnautica", rift_id: "993520564054974", steam_id: "264710", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: true});
      VR.insert({title: "Windlands", steam_id: "428370", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: true, support_kbm: true});
      VR.insert({title: "The House of the Dying Sun", rift_id: "993520564054974", steam_id: "283160", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Please Don't Touch Anything", rift_id: "1088797664494908", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Titans of Space 2.0", rift_id: "1023198204421743", steam_id: "468820", category: "games", support_rift: true, support_vive: true, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: true, support_kbm: true});
      VR.insert({title: "Glitchspace", steam_id: "290060", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: false, support_gamepad: true, support_motion: false, support_kbm: false});
      VR.insert({title: "Bombsquad", rift_id: "900601920057477", category: "games", support_rift: true, support_vive: false, support_singleplayer: true, support_multiplayer: true, support_gamepad: true, support_motion: false, support_kbm: false});

      console.log('inserted sample data');
      
    } // FindOne 

}); // End startup

// Deny client updates

VR.deny({
  insert() {
    return true;
  }, 
  update() {
    return true;
  }, 
  remove() {
    return true;
  },
});


// Don't let users change their profile

Meteor.users.deny({
  update() {
    return true;
  },
});


// List of all accounts methods from meteor shell command 'Meteor.server.method_handlers'
const AUTH_METHODS = [
  'login',
  'logout',
  'logoutOtherClients',
  'getNewToken',
  'removeOtherTokens',
  'configureLoginService',
  'changePassword',
  'forgotPassword',
  'resetPassword',
  'verifyEmail',
  'createUser',
];


// Only allow 2 login attempts per connection per 5 seconds
DDPRateLimiter.addRule({
  name(name) {
    return _.contains(AUTH_METHODS, name);
  },

  // Rate limit per connection ID
  connectionId() { return true; },
}, 2, 5000);





// Publish entire VR

Meteor.publish('VR', function(){
  if(!this.userId){

    // show everything except drafts
    return VR.find({ draft : { $exists : false } }, { sort: { 'title': 1 }});
  } else {

    // if logged in shows drafts first
    return VR.find({}, { sort: { 'draft': -1, 'title': 1 }});
  }
});

Meteor.publish('Users', function(){
  if(!this.userId){

    // no user nothing
    return false;
  } else {  

    // logged in, can see users
    return Meteor.users.find({});
  }
});

Meteor.methods({
  'VR.updateFeature': function(title_id, data_support, hasSupport){
    if(!Meteor.user()){

      throw new Meteor.Error('logged-out', 'The user must be logged in to update titles');

    } else {

      // check params
      check(title_id, String);
      check(data_support, String);
      check(hasSupport, Boolean);

      // log method params
      console.log('updateFeature', title_id, data_support, hasSupport);

      // build object using data_support as key
      var update_obj = {};
      update_obj[data_support] = hasSupport;

      // if title exists
      if(!VR.findOne({_id: title_id})){

        throw new Meteor.Error('unknown-id', 'Title not found');

      } else {
        // update with object
        VR.update({_id: title_id}, { $set: update_obj});      
      }
    }
  },
  'VR.updateLink': function(title_id, link){
    if(!Meteor.user()){

      throw new Meteor.Error('logged-out', 'The user must be logged in to update titles');

    } else {

      // check params
      check(title_id, String);
      check(link, String);

      // log method params
      console.log('updateLink', title_id, link);

      var steam_string = 'http://store.steampowered.com/app/';
      var rift_string = 'https://www.oculus.com/experiences/rift/';

      // check the link if it contains steam and oculus URL's
      isSteam = (link.indexOf(steam_string) !== -1);
      isRift = (link.indexOf(rift_string) !== -1);

      console.log('isSteam', isSteam);
      console.log('isRift', isRift);

      // XOR check the link doesnt contain BOTH URLs 
      if((isSteam && !isRift)||(!isSteam && isRift)){

        if(isSteam){

          if (link.length > 40){
            // link is longer than expected, shortening
            link = link.substring(0, 40);
            console.log('stripping link', link);
          }

          // build object from stripped steam link and strip slashes
          var update_obj = {};
          var steam_regex = new RegExp(steam_string,'g');
          stripped_link = link.replace(steam_regex,'');
          stripped_link = stripped_link.replace('/','');
          update_obj.steam_id = stripped_link;

        } else if (isRift){

          if (link.length > 56){

            // link is longer than expected, shortening
            link = link.substring(0, 56);
            console.log('stripping link', link);
          }

          // build object from stripped rift link and strip slashes
          var update_obj = {};
          var rift_regex = new RegExp(rift_string,'g');
          stripped_link = link.replace(rift_regex,'');
          stripped_link = stripped_link.replace('/','');
          update_obj.rift_id = stripped_link;
          update_obj.support_rift = true;

        } else {
          // link invalid
          throw new Meteor.Error('link-mismatch', 'Link doesn\'t appear to be a valid Steam or Oculus URL');
        }
      } else {
        // link invalid
        throw new Meteor.Error('link-mismatch', 'Link doesn\'t appear to be a valid Steam or Oculus URL');
      }

      if(!update_obj){
        // no update object, dont update
        throw new Meteor.Error('link-mismatch', 'Link doesn\'t appear to be a valid Steam or Oculus URL');
      }

      // if title exists
      if(!VR.findOne({_id: title_id})){

        throw new Meteor.Error('unknown-id', 'Title not found');

      } else {
        // update with object
        VR.update({_id: title_id}, { $set: update_obj});
        return link;  
      }
    }
  }, 
  'VR.deleteTitle': function(title_id){
    if(!Meteor.user()){

      throw new Meteor.Error('logged-out', 'The user must be logged in to delete titles');

    } else {

      // check params
      check(title_id, String);

      // log method params
      console.log('deleteTitle', title_id);

      // if title exists
      if(!VR.findOne({_id: title_id})){

        throw new Meteor.Error('unknown-id', 'Title not found');

      } else {
        // remove title
        VR.remove({_id: title_id});      
      }
    }
  }, 
  'VR.updateTitle': function(title_id, new_title){
    if(!Meteor.user()){

      throw new Meteor.Error('logged-out', 'The user must be logged in to update titles');

    } else {

      // check params
      check(title_id, String);
      check(new_title, String);

      // log method params
      console.log('updateTitle', title_id, new_title);

      // build object using new_title
      var update_obj = {};
      update_obj.title = new_title;

      // if title exists
      if(!VR.findOne({_id: title_id})){

        throw new Meteor.Error('unknown-id', 'Title not found');

      } else {
        // update with object
        VR.update({_id: title_id}, { $set: update_obj});
        return new_title;
      }
    }
  }, 
  'VR.newTitle': function(){
    if(!Meteor.user()){

      throw new Meteor.Error('logged-out', 'The user must be logged in to create titles');

    } else {

      // create a blank and title return _id
      return VR.insert({ draft: true, title: "", category: "games", support_rift: false, support_vive: false, support_singleplayer: false, support_multiplayer: false, support_gamepad: false, support_motion: false, support_kbm: false});
    }
  }, 
  'VR.publishTitle': function(title_id){
    if(!Meteor.user()){

      throw new Meteor.Error('logged-out', 'The user must be logged in to publish titles');

    } else {

      // check params
      check(title_id, String);

      // log method params
      console.log('publishTitle', title_id);

      // build object using new_title
      var update_obj = {};
      update_obj.draft = true;

      // if title exists
      if(!VR.findOne({_id: title_id})){

        throw new Meteor.Error('unknown-id', 'Title not found');

      } else {
        // update with object
        VR.update({_id: title_id}, { $unset: update_obj});      
      }
    }
  }, 

});