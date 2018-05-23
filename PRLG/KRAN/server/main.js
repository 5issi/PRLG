import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertStatement(statementName, correct, chosen){
		Statementlist.insert({
			statementName: statementName,
			correct: correct,
			chosen: chosen
		});
	}
});

Meteor.publish('statements', function(){
    return Statementlist.find({});
});
