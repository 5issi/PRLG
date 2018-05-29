import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.clicking.helpers({
	testImg: new Image(120,200);
	testImg.src = "117510_12.jpg";
	console.log("did this work?");

});

Template.clicking.events({
	'click .testImage': function(event){
		console.log("so far, so good");
		var clicked1 = true;
		var card = event.target.id;
		if (testImage)
	},
	'click .testImage2': function(event){
		console.log("so far, so good");
		var clicked2 = true;
		var card = event.target.id;
	},
	'click .testImage3': function(event){
		console.log("so far, so good");
		var clicked3 = true;

		var card = event.target.id;
	},
	'click .testImage4': function(event){
		console.log("so far, so good");
		var clicked4 = true;

		var card = event.target.id;
	},
	'click .testImage5': function(event){
		console.log("so far, so good");
		var clicked5 = true;

		var card = event.target.id;
	},
	'click .testImage6': function(event){
		console.log("so far, so good");
		var clicked6 = true;

		var card = event.target.id;
	}
});
