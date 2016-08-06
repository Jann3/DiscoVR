// define VR collection and subscribe
VR = new Mongo.Collection('VR');
Meteor.subscribe('VR');
Meteor.subscribe('Users');

// set up the main template the the router will use to build pages
Router.configure({
  layoutTemplate: 'layout'
});

//specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
  this.render('navbar', {to:'header'});

  this.render('vr_list', {to:'main'});
  
  this.render('site_info', {to:'footer'}); 
}, {
  name: 'main_page'
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
    var rift_btn = $('.js-set-rift');
    var vive_btn = $('.js-set-vive');

    // remove active class from all headset
    navbar_headset.parent('li').removeClass('active');

    if(Session.get('headset')==headset_html){
      // if already selected, remove session, reset tooltip
      Session.set('headset', undefined);
      navbar_headset.attr('data-original-title', '');
      rift_btn.removeClass('btn-success');
      vive_btn.removeClass('btn-success');
      rift_btn.addClass('btn-default');
      vive_btn.addClass('btn-default');
      $('.js-browse').addClass('hidden');
    } else {
      // else add to session and add active class
      Session.set('headset', headset_html);
      headset_contains_headset.parent('li').addClass('active');
      // reset tooltips then add tooltip to current
      navbar_headset.attr('data-original-title', '');
      headset_contains_headset.attr('data-original-title', 'Remove Filter');
    }

    // remove focus
    navbar_headset.blur();
  },
  'click .js-headset-filter': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_headset = $('.navbar').find('.js-headset');
    var rift_btn = $('.js-set-rift');
    var vive_btn = $('.js-set-vive');

    // remove active class from all headset
    navbar_headset.parent('li').removeClass('active');

    // reset headset and tooltips
    Session.set('headset', undefined);
    navbar_headset.attr('data-original-title', '');

    rift_btn.removeClass('btn-success');
    vive_btn.removeClass('btn-success');
    rift_btn.addClass('btn-default');
    vive_btn.addClass('btn-default');
    $('.js-browse').addClass('hidden');

    // remove focus
    navbar_headset.blur();
  },
  'click .js-gamepad': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_gamepad = $('.navbar').find('.js-gamepad');

    if(Session.get('support_gamepad')==true){
      // if already selected, remove session, active and tooltip
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
      // if already selected, remove session, active and tooltip
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
      // if already selected, remove session, active and tooltip
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
  }, 
  'click .js-singleplayer': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_singleplayer = $('.navbar').find('.js-singleplayer');

    if(Session.get('support_singleplayer')==true){
      // if already selected, remove session, active and tooltip
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
    navbar_singleplayer.blur();
  }, 
  'click .js-multiplayer': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_multiplayer = $('.navbar').find('.js-multiplayer');

    if(Session.get('support_multiplayer')==true){
      // if already selected, remove session, active and tooltip
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
  'keyup #search_input':function(event){

    if(search_input.value){

      // log input
      //console.log('search_input ', search_input.value);

      // trim whitespace from search input
      var search_trim_whitespace = search_input.value.trim();

      // trim special characters
      var trim_special_chars = search_trim_whitespace.replace(/[^a-zA-Z0-9'., ]/g, '');

      // replace whitespace with regex AND operator
      var whitespace_regex = trim_special_chars.replace(/ /g, ')(?=.*');

      // trim duplicate regex insertions of (?=.*) caused by extra whitespace
      var trim_excess_regex = whitespace_regex.replace(/\(\?=.\*\)/g,'');

      // build final regex
      var search_regex = new RegExp('(?=.*' +trim_excess_regex+ ').*','i');

      // log output regex and set it as search
      //console.log('search_regex', search_regex);
      search.set(search_regex); 

    } else {
      // no value clear search
      search.set(undefined);
    }

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
      var trim_special_chars = search_trim_whitespace.replace(/[^a-zA-Z0-9'., ]/g, '');

      // replace whitespace with regex AND operator
      var whitespace_regex = trim_special_chars.replace(/ /g, ')(?=.*');

      // trim duplicate regex insertions of (?=.*) caused by extra whitespace
      var trim_excess_regex = whitespace_regex.replace(/\(\?=.\*\)/g,'');

      // build final regex
      var search_regex = new RegExp('(?=.*' +trim_excess_regex+ ').*','i');

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
  'shown.bs.modal #js-search-modal': function(event){

    // hide tooltip and focus search_input on search modal shown
    $('.js-search-button').tooltip('hide');
    $('#search_input').select();
  }, 
  'hidden.bs.modal #js-search-modal': function(event){

    // jQuery caching optimization and hide tooltip
    var search_btn = $('.js-search-button');
    search_btn.attr('data-original-title', '');
    search_btn.tooltip('hide');
    search_btn.blur();

    // call timeout function
    setTimeout(function(){
      // jQuery caching optimization and reset tooltip
      var search_btn = $('.js-search-button');
      search_btn.tooltip('hide');
      search_btn.attr('data-original-title', 'search titles');
      search_btn.blur();
      // run after 100ms
    }, 100);
  },
  'click .js-navbar-toggle':function(event){
    $('.js-navbar-toggle').tooltip('hide');
  }, 
  'click .js-search-button':function(event){
    $('.js-search-button').attr('data-original-title', '');
  }, 
  'click .js-remove-search': function (event) {
    event.preventDefault();

    // get the text of the term
    var remove_term_text = $(event.currentTarget).closest('a').text();

    // remove all quotes from text
    var remove_term = remove_term_text.replace(/'/g,'');

    // create regex for removing term
    var term_regex = new RegExp('' + remove_term + '','g');

    // get current search input value
    var search_val = search_input.value;

    // strip search term from value
    var stripped_val = search_val.replace(term_regex, '');

    // trim whitespace and set input value
    search_input.value = stripped_val.trim();

    // submit input
    $('#search_input').submit();
  },
}); // End layout events




Template.vr_list.events({
  'click .js-new-title': function () {

  // get the first stretch element and its height
  var first_stretch = $('.stretch').first();
  var stretch_height = first_stretch.height();

  // if element and height exist
  if(first_stretch&&stretch_height){

    first_stretch.animate({
      // double the height
      height: '+=' + stretch_height
    }, 100).animate({
      // then half it
      height: '-=' + stretch_height
    }, 0, function() {
      // animation complete now create new title
      Meteor.call('VR.newTitle');
    });

  } else {
    // no element to animate, just create new title
    Meteor.call('VR.newTitle');
  }

  }, 
}); // End vr_list events




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
    search_input.value = '';

    // reset tooltips
    $('.navbar').find('a').attr('data-original-title', '');

    // remove active li's from navbar
    $('.navbar').find('li').removeClass('active');

    // jQuery caching optimization
    var rift_btn = $('.js-set-rift');
    var vive_btn = $('.js-set-vive');

    rift_btn.removeClass('btn-success');
    vive_btn.removeClass('btn-success');
    rift_btn.addClass('btn-default');
    vive_btn.addClass('btn-default');
    $('.js-browse').addClass('hidden');
  }, 
}); // End vr_filters events




Template.vr_admin_title.events({
  'click .js-toggle': function (event) {

    // jQuery caching optimization
    var current_event = $(event.currentTarget);

    // get title_id
    var title_id = current_event.parent().closest('span').attr('id');

    // get supported_feature
    var data_support = current_event.data('support');

    // state of feature support
    var hasSupport = current_event.hasClass('active');

    console.log(title_id, data_support, hasSupport);

    // if id and feature exist
    if(title_id && data_support){
      // call VR.updateFeatureSupport with params and state
      Meteor.call('VR.updateFeatureSupport', title_id, data_support, hasSupport);
    }
  }, 
  'click .js-open-link': function (event) {

    // get data-target
    var current_target = $(event.currentTarget).data('target');

    // get value of input
    var href_val = $('#' + current_target).val();

    // if href value
    if(href_val){

      console.log('opening..', href_val);

      var open_win = window.open(href_val, '_blank');
      if (open_win) {
        // if it opened
        open_win.focus();
      } else {
        // problem opening
        alert('Please allow popups for this website');
      }
    } else {
      // no href
      console.log('no href');
      $('#' + current_target).focus();
    }
  },
  'click .js-save-link': function (event) {

    // jQuery caching optimization
    var current_event = $(event.currentTarget);

    // get title_id
    var title_id = current_event.parents().closest('span').attr('id');

    console.log('title_id', title_id);

    // get data-target
    var current_target = current_event.data('target');

    // get value of input
    var href_val = $('#' + current_target).val();

    // if href value
    if(title_id && href_val){

      console.log('saving..', href_val);

      // this might need changing
      // set the data attribute
      $('#' + current_target).data('original-value', href_val);

      // call update
      Meteor.call('VR.updateLink', title_id, href_val);

    } else {
      // no href
      console.log('no href');
      $('#' + current_target).focus();
    }
  }, 
  'click .js-rename-title': function (event) {

    // get title_id
    var title_id = $(event.currentTarget).parents().closest('span').attr('id');

    // get value of input
    var title_val = $('#'+title_id).find('.js-title').val();

    // check title
    if(!title_id){

      // no title
      console.log('no title');
      return false;

    } else {

      console.log('renaming..', title_id, title_val);

      // set the data attribute
      $('#'+title_id).find('.js-title').data('original-value', title_val);

      // call update
      Meteor.call('VR.updateTitle', title_id, title_val);

    } 
  }, 
  'click .js-delete-title': function (event) {

    // jQuery caching optimization
    var current_event = $(event.currentTarget);

    // get title_id
    var title_id = current_event.parents().closest('span').attr('id');

    // if title_id
    if(!title_id){

      // no title
      console.log('no title selected');

    } else {

      // animate hide
      $('#'+title_id).parent().hide('fast', function(){ 

        console.log('deleting..', title_id);

        // call delete
        Meteor.call('VR.deleteTitle', title_id);
      });
    } 
  }, 
  'click .js-publish-title': function (event) {

    // jQuery caching optimization
    var current_event = $(event.currentTarget);

    // get title_id
    var title_id = current_event.parents().closest('span').attr('id');

    // if title_id
    if(!title_id){

      // no title
      console.log('no title selected');

    } else {

      // animate hide
      console.log('publishing..', title_id);

      // call publish
      Meteor.call('VR.publishTitle', title_id);
    } 
  }, 
  'change .js-change-input, keyup .js-change-input': function (event) {

    // when input is changed or keypressed call timeout function
    setTimeout(function(){

      // get value and original value
      new_value = $(event.currentTarget).val()
      old_value = $(event.currentTarget).data('original-value');

      if(new_value!=old_value){
        // if not the same change bg
        $(event.currentTarget).css('background-color','#E6E6FF');
      } else {
        // reset bg
        $(event.currentTarget).css('background-color','#FFFFFF');
      }
      // run after 100ms
    }, 100);

  }, 
}); // End vr_admin_title events




Template.site_info.events({
  'click .js-logout':function(event){

    if (Meteor.user()){

      console.log('logging out...');

      Meteor.logout(function(){
        console.log('logged out');
        return true;
      });
    } else {

      console.log('not logged in');
      return false;
    }
  }, 
  'click #login_button' : function(event){

    // submit login form when login button clicked
    $('#login_form').submit();

  },
  'submit #login_form' : function(event, template){

    event.preventDefault();

    console.log('user login..');

    // get login values
    var login = template.find('#login_email').value
    var password = template.find('#login_password').value;


    if(!login&&!password){
      console.log('no username or password');
      $('#form_error').html('No Username or Email, or Password');
      $('#login_email').focus();
      return false;
    }

    if (!login){
      console.log('no username or email');
      $('#form_error').html('No Username or Email');
      $('#login_email').focus();
      return false;
    }

    if (!password){
      console.log('no password');
      $('#form_error').html('No Password');
      $('#login_password').focus();
      return false;
    }

    console.log('attempting login..');

    Meteor.loginWithPassword(login, password, function(err){

      if (err){
        // login attempt failed
        console.log(err);
        $('#form_error').html(err.reason);
      } else {
        // user has been logged
        console.log('logged in');
        // reset error message
        $('#form_error').html('');
        // hide modal
        $('#login-modal').modal('hide');
        // scroll to top of page
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        return true;
      }
    });
  }, 
  'shown.bs.modal #login-modal': function(event){

    // login modal shown 
    if(!$('#login_email').val()){
      // no login value - so focus input
      $('#login_email').focus();
    } else if(!$('#login_password').val()){
      // no password value so focus input
      $('#login_password').focus();
    } else {
      // focus login button
      $('#login_button').focus();
    }
  }, 
  'click .js-set-rift': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var headset_html = 'Rift';
    var navbar_headset = $('.navbar').find('.js-headset');
    var headset_contains_headset = $('.navbar .js-headset:contains("Rift")');
    var rift_btn = $('.js-set-rift');
    var vive_btn = $('.js-set-vive');

    // remove active class from all headset
    navbar_headset.parent('li').removeClass('active');

    if(Session.get('headset')==headset_html){
      // if already selected, remove session, reset tooltip
      Session.set('headset', undefined);
      navbar_headset.attr('data-original-title', '');
      rift_btn.addClass('btn-default');
      rift_btn.removeClass('btn-success');
      $('.js-browse').addClass('hidden');
    } else {
      // else add to session and add active class
      Session.set('headset', headset_html);
      headset_contains_headset.parent('li').addClass('active');
      // reset tooltips then add tooltip to current
      navbar_headset.attr('data-original-title', '');
      headset_contains_headset.attr('data-original-title', 'Remove Filter');
      vive_btn.removeClass('btn-success');
      rift_btn.addClass('btn-success');
      $('.js-browse').removeClass('hidden');
    }
  },
  'click .js-set-vive': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var headset_html = 'Vive';
    var navbar_headset = $('.navbar').find('.js-headset');
    var headset_contains_headset = $('.navbar .js-headset:contains("Vive")');
    var rift_btn = $('.js-set-rift');
    var vive_btn = $('.js-set-vive');

    // remove active class from all headset
    navbar_headset.parent('li').removeClass('active');

    if(Session.get('headset')==headset_html){
      // if already selected, remove session, reset tooltip
      Session.set('headset', undefined);
      navbar_headset.attr('data-original-title', '');
      vive_btn.addClass('btn-default');
      vive_btn.removeClass('btn-success');
      $('.js-browse').addClass('hidden');
    } else {
      // else add to session and add active class
      Session.set('headset', headset_html);
      headset_contains_headset.parent('li').addClass('active');
      // reset tooltips then add tooltip to current
      navbar_headset.attr('data-original-title', '');
      headset_contains_headset.attr('data-original-title', 'Remove Filter');
      rift_btn.removeClass('btn-success');
      vive_btn.addClass('btn-success');
      $('.js-browse').removeClass('hidden');
    }
  },
  'click .js-browse-all': function (event) {
    event.preventDefault();

    // jQuery caching optimization
    var navbar_headset = $('.navbar').find('.js-headset');
    var headset_contains_headset = $('.navbar .js-headset:contains("Vive")');
    var rift_btn = $('.js-set-rift');
    var vive_btn = $('.js-set-vive');

    // remove active class from all headset
    navbar_headset.parent('li').removeClass('active');

    // remove headset from session
    Session.set('headset', undefined);
    navbar_headset.attr('data-original-title', '');
    rift_btn.addClass('btn-default');
    rift_btn.removeClass('btn-success');
    vive_btn.addClass('btn-default');
    vive_btn.removeClass('btn-success');
    $('.js-browse').addClass('hidden');

    setTimeout(function(){
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    }, 300);
  },
  'click .js-browse': function (event) {
    event.preventDefault();

    setTimeout(function(){
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    }, 300);
  },
}); // End site_info events




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
    console.log('search_obj', search_obj);

    // query database with search object
    return VR.find(search_obj, { sort: { 'draft': -1, 'title': 1 }});
  },
  getUsername:function(){
    if(Meteor.user()){
      return Meteor.user().username;
    }
  }, 
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
  }, 
}); // End vr_title helpers




Template.vr_filters.helpers({
  getSession:function(){
    if(Session.get('headset')||Session.get('support_gamepad')||Session.get('support_motion')||Session.get('support_kbm')||Session.get('support_singleplayer')||Session.get('support_multiplayer')||search.get()){
      return true;
    } else {
      return false;
    }
  }, 
  getSearch:function(){
    if (search.get()){

      // trim whitespace from search input
      var search_trim_whitespace = search_input.value.trim();

      // trim special characters
      var trim_special_chars = search_trim_whitespace.replace(/[^a-zA-Z0-9'., ]/g, '');

      // replace whitespace with regex AND operator
      var whitespace_regex = trim_special_chars.replace(/ /g, '\'</a> <a href="#" class="js-remove-search label label-primary">\'');

      // trim duplicate regex insertions of (?=.*) caused by extra whitespace
      var trim_excess_regex = whitespace_regex.replace(/<a href=\"#\" class=\"js-remove-search label label-primary\">\'\'<\/a> /g,'');

      // build final search_labels html
      var search_labels = '<!-- Search labels-->' + '<a href="#" class="js-remove-search label label-primary" title="remove search">\'' + trim_excess_regex + '\'</a>';

      return search_labels;
    } else {
      return false;
    }
  }, 
  getFilters:function(){

    // initialise filter string
    var filters_string = '';

    if(Session.get('headset')||Session.get('support_gamepad')||Session.get('support_motion')||Session.get('support_kbm')||Session.get('support_singleplayer')||Session.get('support_multiplayer')){

      if(Session.get('headset')){
        filters_string += '<a href="#" class="js-headset-filter label label-default" title="Remove This Filter"> ' + Session.get('headset') + '</a> ';
      } 
      if (Session.get('support_gamepad')){
        filters_string += '<a href="#" class="js-gamepad label label-default" title="Remove Gamepad Filter"><i class="fa fa-gamepad fa-lg hidden-md hidden-lg" aria-hidden="true"></i><span class="hidden-xs hidden-sm"> Gamepad</span></a> ';
      }
      if (Session.get('support_motion')){
        filters_string += '<a href="#" class="js-motion label label-default" title="Remove Motion Filter"><i class="fa fa-hand-paper-o fa-lg hidden-md hidden-lg" aria-hidden="true"></i><span class="hidden-xs hidden-sm"> Motion Controllers</span></a> ';
      } 
      if (Session.get('support_kbm')){
        filters_string += '<a href="#" class="js-kbm label label-default" title="Remove Keyboard &amp; Mouse Filter"><i class="fa fa-keyboard-o fa-lg hidden-md hidden-lg" aria-hidden="true"></i><span class="hidden-xs hidden-sm"> Keyboard &amp; Mouse</span></a> ';
      } 
      if (Session.get('support_singleplayer')){
        filters_string += '<a href="#" class="js-singleplayer label label-default" title="Remove Singleplayer Filter"><i class="fa fa-user fa-lg hidden-md hidden-lg" aria-hidden="true"></i><span class="hidden-xs hidden-sm"> Singleplayer</span></a> ';
      }
      if (Session.get('support_multiplayer')){
        filters_string += '<a href="#" class="js-multiplayer label label-default" title="Remove Multiplayer Filter"><i class="fa fa-users fa-lg hidden-md hidden-lg" aria-hidden="true"></i><span class="hidden-xs hidden-sm"> Multiplayer</span></a> ';
      } 
    }

    if (filters_string){
      return filters_string;
    } else {
      return false;
    }
  }, 
}); // End vr_filters helpers



Template.site_info.helpers({
  isRift:function(){
    if(Session.get('headset')=='Rift'){
      return true;
    } else {
      return false;
    }
  }, 
  isVive:function(){
    if(Session.get('headset')=='Vive'){
      return true;
    } else {
      return false;
    }
  }, 
}); // End vr_filters helpers