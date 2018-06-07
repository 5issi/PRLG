import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Mongo } from 'meteor/mongo';
import './main.html';
//var cardArray = new Array();
var cardArray = [

{ label: 'firstCard', num: '1', partner: '2',  clicked: false}, // img: '117510_3.jpg',
{ label: 'secondCard', num: '2', partner: '4', clicked: false}, // img: '117510_4.jpg',
{ label: 'thirdCard', num: '3', partner: '3', clicked: false}, // img: '117510_4.jpg',
{ label: 'fourthCard', num: '4', partner: '4', clicked: false}, // img: '117510_4.jpg',
{ label: 'fifthCard', num: '5', partner: '1', clicked: false}, 
 // img: '117510_11.jpg',
];



var testBool = false;
Template.clicking.helpers({
	fun(){
	testImg: new Image(120,200);
	testImg.src = "117510_12.jpg";
	console.log("did this work?");
	},
	fun2(){
	
	},
	'changeInput' : function(event,template){ 
    var file = event.target.files[0]; //assuming 1 file only
    if (!file) return;

    var reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = function(event){          
      var buffer = new Uint8Array(reader.result) // convert to binary
      Meteor.call('saveFile', buffer);
    }

    reader.readAsArrayBuffer(file); //read the file as arraybuffer
}

});

Template.clicking.events({
	'click .testImage': function(event){
		console.log("so far, so good");
		var clicked1 = true;
		cardArray[0].clicked = true;
		var file = event.target.id;
		if (!file) return;
	    var reader = new FileReader();
	    reader.onload = function(event){          
      	var buffer = new Uint8Array(reader.result) // convert to binary
      	Meteor.call('saveFile', buffer);
    	}
    	reader.readAsArrayBuffer(file);

		//cardArray.push(card);		
	},
	'click .testImage2': function(event){
		console.log("so far, so good");
		var clicked2 = true;
		cardArray[1].clicked = true;
		if(cardArray[3].clicked == true  ){
			console.log("found pair");
			
		}
		console.log(clicked2);
		var card = event.target.id;
	},
	'click .testImage3': function(event){
		console.log("so far, so good");
		var clicked3 = true;
		var cardNumber = 1;

		var card = event.target.id;
	},
	'click .testImage4': function(event){
		console.log("so far, so good");
		var clicked4 = true;
		var cardNumber = 1;
		cardArray[3].clicked = true;
		testBool = true;
		var card = event.target.id;
	},
	'click .testImage5': function(event){
		console.log("so far, so good");
		var clicked5 = true;
		var cardNumber = 1;

		var card = event.target.id;
	},
	'click .testImage6': function(event){
		console.log("so far, so good");
		var clicked6 = true;
		var cardNumber = 1;

		var card = event.target.id;
	},
	
});
