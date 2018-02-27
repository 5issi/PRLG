import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertPatient( name, diagnosis, createdAt){
		Patientlist.insert({name: name, diagnosis: diagnosis, createdAt: createdAt});
	},
	insertTherapist( name, createdAt){
		Therapists.insert({name:name, createdAt:createdAt});
	}
});