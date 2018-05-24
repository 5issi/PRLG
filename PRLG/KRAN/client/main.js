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
	'checkIfCorrect': function(){
		var documentId = this._id;
		if(this.chosen == null){
			console.log("noch keine Antwort");
			return true;
		}
	},
	'checkIfIncorrect': function(){
		Meteor.subscribe('statements');
		console.log("falsche Antwort?");
		var documentId = this._id;
		if((this.chosen == "ja" && this.correct =="nein") || (this.chosen == "nein" && this.correct =="ja")){
			console.log("falsche Antwort, Hinweis einblenden");
			return true;
		}
	},
	'taskType1': function(){
		if (this.taskType == "Welche Aussage stimmt?"){
			return true;
		}
	}
});

Template.statements.events({
    'click .menuitem': function (event) {
        $('#mt-command-dd').text(event.target.text);
    },
	'submit form': function(event){
		//Meteor.subscribe('statements');
	    event.preventDefault();
	    var stateMent = $('[name="stateMent"]').val();
	    var taskType = $('[name="taskType"]').val();
	    var correct = $('[name="correct"]').val();
	    var correction = $('[name="correction"]').val();
		Meteor.call('insertStatement', taskType, stateMent, correct, null, correction);
	    $('[name="stateMent"]').val('');
	    $('[name="taskType"]').val('');
	    $('[name="correct"]').val('');
	    $('[name="correction"]').val('');
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
	},
	'click .nein': function(event){
	console.log("we are in statement item events");
	var documentId = this._id;
	console.log(this.chosen);
	Statementlist.update(this._id, {
		$set: { chosen: "nein" },
	});
	}
});
