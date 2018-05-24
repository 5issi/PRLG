import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertStatement(taskType, statementName, correct, chosen, correction){
		Statementlist.insert({
			taskType: taskType,
			statementName: statementName,
			correct: correct,
			chosen: chosen,
			correction: correction
		});
	}
});



Meteor.publish('statements', function(){
    return Statementlist.find({});
});
