import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var counter = 0;

Template.statements.helpers({
	'statement': function(){
		//Meteor.subscribe('statements');
    	//var currentUser = Meteor.userId();
		return Statementlist.find({});
	},
});

Template.statements.events({
    'click .menuitem': function (event) {
        $('#mt-command-dd').text(event.target.text);
    },
	'submit form': function(event){
		//Meteor.subscribe('statements');
	    event.preventDefault();
	    var stateMent = $('[name="stateMent"]').val();
	    var correct = $('[name="correct"]').val();
		Meteor.call('insertStatement', stateMent, correct);
    $('[name="stateMent"]').val('');
    $('[name="correct"]').val('');
    counter++;
	}

});

Template.statementItem.events({
	'click .ja': function(event){
	console.log("we are in statement item events");
	var documentId = this._id;
	console.log(this.chosen);
	Statementlist.update(this._id, {
		$set: { chosen: "ja" },
	});
	}
});
