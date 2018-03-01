import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertPatient(name, diagnosis, age, createdBy, createdAt){
		Patientlist.insert({
			name: name, 
			diagnosis: diagnosis, 
			age: age,
			createdBy: createdBy,
			createdAt: createdAt
		});
	},
	insertTherapist( name, createdBy, createdAt){
		Therapists.insert({
			name:name, 
			createdBy: createdBy,
			createdAt:createdAt
		});
	}
});

Meteor.publish('patients', function(){
	return Patientlist.find();
});

Meteor.publish('therapists', function(){
	return Therapists.find();
});