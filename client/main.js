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


// define default_search regexp, use it to initialize a reactive var for searches
var search = new ReactiveVar();

Template.layout.events({
  'click .js-headset': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var headset_html = $(event.currentTarget).closest('a').html();
    var navbar_headset = $('.navbar').find('.js-headset');
    var headset_contains_headset = $('.navbar .js-headset:contains("'+ headset_html +'")');

    if(Session.get('headset')==headset_html){
      // if already active, remove session, active and focus
      Session.set('headset', undefined);
      navbar_headset.parent('li').removeClass('active');
      navbar_headset.attr('data-original-title', '');
    } else {
      // else add to session and add active class
      Session.set('headset', headset_html);
      navbar_headset.parent('li').removeClass('active');
      headset_contains_headset.parent('li').addClass('active');
      navbar_headset.attr('data-original-title', '');
      headset_contains_headset.attr('data-original-title', 'Remove Filter');
    }

    // remove focus
    navbar_headset.blur();
    //navbar_headset.tooltip('hide');
  },
  'click .js-gamepad': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_gamepad = $('.navbar').find('.js-gamepad');

    if(Session.get('support_gamepad')==true){
      // if already active, remove session and active
      Session.set('support_gamepad', undefined);
      navbar_gamepad.parent('li').removeClass('active');
      navbar_gamepad.attr('data-original-title', '');
    } else {
      // else add to session and add active class
      Session.set('support_gamepad', true);
      navbar_gamepad.parent('li').addClass('active'); 
      navbar_gamepad.attr('data-original-title', 'Remove Filter');
    }

    // remove focus
    navbar_gamepad.blur();
  }, 
  'click .js-motion': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_motion = $('.navbar').find('.js-motion');

    if(Session.get('support_motion')==true){
      // if already active, remove session, active and focus
      Session.set('support_motion', undefined);
      navbar_motion.parent('li').removeClass('active');
      navbar_motion.attr('data-original-title', '');
    } else {
      // else add to session and add active class
      Session.set('support_motion', true);
      navbar_motion.parent('li').addClass('active'); 
      navbar_motion.attr('data-original-title', 'Remove Filter');
    }

    // remove focus
    navbar_motion.blur();
  }, 
  'click .js-kbm': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_kbm = $('.navbar').find('.js-kbm');

    if(Session.get('support_kbm')==true){
      // if already active, remove session, active and focus
      Session.set('support_kbm', undefined);
      navbar_kbm.parent('li').removeClass('active');
      navbar_kbm.attr('data-original-title', '');
    } else {
      // else add to session and add active class
      Session.set('support_kbm', true);
      navbar_kbm.parent('li').addClass('active'); 
      navbar_kbm.attr('data-original-title', 'Remove Filter');
    }

    // remove focus
    navbar_kbm.blur();
    // echo headset from session
    console.log(Session.get('support_kbm'));
  }, 
  'click .js-singleplayer': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_singleplayer = $('.navbar').find('.js-singleplayer');

    $(event.currentTarget).focus();

    if(Session.get('support_singleplayer')==true){
      // if already active, remove session, active and focus
      Session.set('support_singleplayer', undefined);
      navbar_singleplayer.parent('li').removeClass('active');
      navbar_singleplayer.attr('data-original-title', '');

    } else {
      // else add to session and add active class
      Session.set('support_singleplayer', true);
      navbar_singleplayer.parent('li').addClass('active'); 
      navbar_singleplayer.attr('data-original-title', 'Remove Filter');
    }

    // remove focus
    $(event.currentTarget).blur();
  }, 
  'click .js-multiplayer': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_multiplayer = $('.navbar').find('.js-multiplayer');

    if(Session.get('support_multiplayer')==true){
      // if already active, remove session, active and focus
      Session.set('support_multiplayer', undefined);
      navbar_multiplayer.parent('li').removeClass('active');
      navbar_multiplayer.attr('data-original-title', '');

    } else {
      // else add to session and add active class
      Session.set('support_multiplayer', true);
      navbar_multiplayer.parent('li').addClass('active'); 
      navbar_multiplayer.attr('data-original-title', 'Remove Filter');
    }

    // remove focus
    navbar_multiplayer.blur();
  },
  'submit #search_form':function(event){
    // prevent submit
    event.preventDefault();

    if(search_input.value){

      // log input
      console.log('search_input ', search_input.value);

      // trim whitespace from search input
      var search_trim_whitespace = search_input.value.trim();

      // trim special characters
      var trim_special_chars = search_trim_whitespace.replace(/[^a-zA-Z0-9'., ]/g, "");

      // replace whitespace with regex AND operator
      var whitespace_regex = trim_special_chars.replace(/ /g, ')(?=.*');

      // trim duplicate regex insertions of (?=.*) caused by extra whitespace
      var trim_excess_regex = whitespace_regex.replace(/\(\?=.\*\)/g,'');

      // build final regex
      var search_regex = new RegExp("(?=.*" +trim_excess_regex+ ").*","i");

      // log output regex and set it as search
      console.log('search_regex', search_regex);
      search.set(search_regex); 

    } else {
      // no value clear search
      search.set(undefined);
    }

    // hide search modal
    $('#js-search-modal').modal('hide');
  }, 
}); // End layout events

Template.vr_filters.events({
  'click .js-reset-filters': function () {

    // reset session objects
    Session.set('headset', undefined);
    Session.set('support_gamepad', undefined);
    Session.set('support_motion', undefined);
    Session.set('support_kbm', undefined);
    Session.set('support_singleplayer', undefined);
    Session.set('support_multiplayer', undefined);

    // clear search 
    search.set(undefined);

    // reset tooltips
    $('.navbar a').attr('data-original-title', '');

    // remove active li's from navbar
    $('.navbar li').removeClass('active');
  }, 
}); // End vr_filters events

Template.vr_list.helpers({
  supported_title:function(){

    // create search object
    var search_obj = new Object();

    // get search string from reactive var
    if(search.get()){
      search_obj.title = search.get();
    }

    // add properties to search object dependant on session
    if(Session.get('headset')=='Rift'){
      search_obj.support_rift = true;
    } else if (Session.get('headset')=='Vive'){
      search_obj.support_vive = true;
    } 

    if(Session.get('support_gamepad')==true){
      search_obj.support_gamepad = true;
    }

    if(Session.get('support_motion')==true){
      search_obj.support_motion = true;
    }

    if(Session.get('support_kbm')==true){
      search_obj.support_kbm = true;
    }

    if(Session.get('support_singleplayer')==true){
      search_obj.support_singleplayer = true;
    }

    if(Session.get('support_multiplayer')==true){
      search_obj.support_multiplayer = true;
    }

    // echo final search object for debugging
    console.log(search_obj);

    // query database with search object
    return VR.find(search_obj);
  }
}); // End vr_list helpers

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
}); // End vr_title helpers

Template.vr_filters.helpers({
  getSession:function(){
    if(Session.get('headset')||Session.get('support_gamepad')||Session.get('support_motion')||Session.get('support_kbm')||Session.get('support_singleplayer')||Session.get('support_multiplayer')||search.get()){
      return true;
    } else {
      return false;
    }
  },
}); // End vr_filters helpers

Meteor.call('getRift', function(error, result) {
  console.log(result);
});
