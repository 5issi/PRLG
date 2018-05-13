import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertQuestion(questionText, answers, correctAnswer){
		Questions.insert({
			questionText: questionText,
			answers: answers,
			correctAnswer: correctAnswer
		});
	},
});

Meteor.publish('questions', function(){
    var currentUser = this.userId;
    return Questions.find({});
});
