// define VR collection and subscribe

VR = new Mongo.Collection('VR');
Meteor.subscribe('VR');

Template.navbar.events({
  'click .js-headset': function (event) {
    event.preventDefault();

    if($(event.currentTarget).closest("li").hasClass("active")){
      // if already active, remove session, active and focus
      Session.set('headset', undefined);
      $(".js-headset").parents().removeClass("active");
      $(".js-headset").blur();
    } else {
      // else add to session and add active class
      Session.set('headset', $(event.currentTarget).closest("a").html());
      $(".js-headset").parents().removeClass("active");
      $(event.currentTarget).closest("li").addClass("active"); 
    }

    // echo headset from session
    console.log(Session.get('headset'));
  }
});

Template.vr_list.helpers({
  supported_title:function(){
    if(Session.get('headset')=='Rift'){
      return VR.find({support_rift: true});
    } else if (Session.get('headset')=='Vive'){
      return VR.find({support_vive: true});
    } else {
      return VR.find();
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
      return '<a href="https://www.oculus.com/experiences/rift/' + rift_id + '/" target="_blank">Oculus</a>';
    } else {
      return false;
    }
  }
});


Meteor.call('getRift', function(error, result) {
  console.log(result);
});
