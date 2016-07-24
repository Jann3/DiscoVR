// define VR collection and subscribe

VR = new Mongo.Collection('VR');
Meteor.subscribe('VR');

// set up the main template the the router will use to build pages
Router.configure({
  layoutTemplate: 'layout'
});
// specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
  this.render('navbar', {to:'header'});
  this.render('vr_list', {to:'main'});
  this.render('site_info', {to:'footer'}); 
});

Template.layout.events({
  'click .js-headset': function (event) {
    event.preventDefault();

    var headset_html = $(event.currentTarget).closest('a').html();

    console.log('html' + headset_html);

    if(Session.get('headset')==headset_html){
      // if already active, remove session, active and focus
      Session.set('headset', undefined);
      $('.navbar .js-headset').parent('li').removeClass('active');
      $('.navbar .js-headset').blur();

    } else {
      // else add to session and add active class
      Session.set('headset', headset_html);
      $('.navbar .js-headset').parent('li').removeClass('active');
      $('.navbar .js-headset:contains("'+ headset_html +'")').parent('li').addClass('active'); 
    }

    // echo headset from session
    console.log(Session.get('headset'));
  },
   'click .js-gamepad': function (event) {
    event.preventDefault();


    if(Session.get('support_gamepad')==true){
      // if already active, remove session, active and focus
      Session.set('support_gamepad', undefined);
      $('.navbar .js-gamepad').parent('li').removeClass('active');
      $('.navbar .js-gamepad').blur();

    } else {
      // else add to session and add active class
      Session.set('support_gamepad', true);
      $('.navbar .js-gamepad').parent('li').addClass('active'); 
    }

    // echo headset from session
    console.log(Session.get('support_gamepad'));
  }, 
});

Template.vr_list.helpers({
  supported_title:function(){
    //var gamepad = false;

    //if(Session.get('support_gamepad')==true)



    if(Session.get('headset')=='Rift'){
      return VR.find({support_rift: true});
    } else if (Session.get('headset')=='Vive'){
      return VR.find({support_vive: true});
    } else {
      return VR.find({});
    }
  }
});

Template.vr_title.helpers({
  getSteamLink:function(support_rift, support_vive, steam_id){
    if(!steam_id){
      // no steam_id, no link
      return false;
    }

    if(!Session.get('headset')){
      // no headset selected, return link
      return '<a href="http://store.steampowered.com/app/' + steam_id + '/" target="_blank">Steam</a>';
    }

    // check if headset is supported before returning steam link
    // reduce duplicate code later
    if(Session.get('headset')=='Rift'&&support_rift==true){
      return '<a href="http://store.steampowered.com/app/' + steam_id + '/" target="_blank">Steam</a>';
    } else if (Session.get('headset')=='Vive'&&support_vive==true){
      return '<a href="http://store.steampowered.com/app/' + steam_id + '/" target="_blank">Steam</a>';
    } else {
      return false;
    }
  },
  getOculusLink:function(support_rift, support_vive, rift_id){
    if(!rift_id){
      // no oculus_id, no link
      return false;
    }

    if(!Session.get('headset')){
      // no headset selected, return link
      return '<a href="https://www.oculus.com/experiences/rift/' + rift_id + '/" target="_blank">Oculus</a>';
    }

    // check if headset is supported before returning steam link
    // reduce duplicate code later
    if(Session.get('headset')=='Rift'&&support_rift==true){
      return '<a href="https://www.oculus.com/experiences/rift/' + rift_id + '/" target="_blank">Oculus</a>';
    } else if (Session.get('headset')=='Vive'&&support_vive==true){
      return false;
    } else {
      return false;
    }
  }
});


Meteor.call('getRift', function(error, result) {
  console.log(result);
});
