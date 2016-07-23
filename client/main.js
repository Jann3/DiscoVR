// define VR collection

VR = new Mongo.Collection('VR');

Template.navbar.events({
  'click .js-headset': function (event) {
    event.preventDefault();

    if($(event.currentTarget).closest("li").hasClass("active")){
      delete Session.keys['headset'];
      $(".js-headset").parents().removeClass("active");
    } else {
      Session.set('headset', $(event.currentTarget).closest("a").html());
      $(".js-headset").parents().removeClass("active");
      $(event.currentTarget).closest("li").addClass("active"); 
    }

    // echo headset from session
    console.log(Session.get('headset'));
  }
});


Meteor.call('getRift', function(error, result) {
  console.log(result);
});
