import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertPatient(name, diagnosis, age, createdAt){
		Patientlist.insert({
			name: name, 
			diagnosis: diagnosis, 
			age: age,
			createdAt: createdAt
		});
	},
	insertTherapist( name, createdAt){
		Therapists.insert({name:name, createdAt:createdAt});
	}
});

Meteor.publish('patients', function(){
	return Patientlist.find();
});

Meteor.publish('therapists', function(){
	return Therapists.find();
});