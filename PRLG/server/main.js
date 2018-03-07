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
	insertTherapist(name, createdBy, createdAt){
		Therapists.insert({
			name: name, 
			createdBy: createdBy,
			createdAt:createdAt
		});
	},
	insertMaterial(name, category, creator, typ){
		Materials.insert({
			name: name, 
			category: category,
			creator: creator,
			typ: typ
		});
	}
});

Meteor.publish('patients', function(){
    var currentUser = this.userId;
    return Patientlist.find({ createdBy: currentUser });
});

Meteor.publish('therapists', function(){
    var currentUser = this.userId;
    return Therapists.find({ createdBy: currentUser });
});

Meteor.publish('materials', function(){
    //var currentUser = this.userId;
    return Materials.find({});
});