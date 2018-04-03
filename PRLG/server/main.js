import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	insertPatient(patientSurName, patientLastName, diagnosis, age, createdBy, createdAt){
		Patientlist.insert({
			patientSurName: patientSurName,
			patientLastName: patientLastName, 
			diagnosis: diagnosis, 
			age: age,
			createdBy: createdBy,
			createdAt: createdAt
		});
	},
	insertTherapist(therapistSurName, therapistLastName, anrede, createdBy, createdAt){
		Therapists.insert({
			therapistSurName: therapistSurName,
			therapistLastName: therapistLastName,
			anrede: anrede,
			createdBy: createdBy,
			createdAt:createdAt
		});
	},
	insertMaterial(materialName, partOf, category, creator, typ){
		Materials.insert({
			materialName: materialName, 
			partOf: partOf,
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

//https://codepen.io/natewiley/pen/HBrbL