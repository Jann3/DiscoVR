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


Meteor.call('getRift', function(error, result) {
  console.log(result);
});
