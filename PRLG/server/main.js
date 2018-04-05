import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
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



Meteor.methods({
	insertPatient(patientSurName, patientLastName, diagnosis, age, patientGender, createdBy, createdAt){
		Patientlist.insert({
			patientSurName: patientSurName,
			patientLastName: patientLastName, 
			diagnosis: diagnosis, 
			age: age,
			patientGender: patientGender,
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
	},

	insertBook(bookName, partOf, category, authorName, typ){
		Books.insert({
			bookName: bookName, 
			partOf: partOf,
			category: category,
			authorName: authorName,
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

Meteor.publish('books', function(){
    //var currentUser = this.userId;
    return Books.find({});
});


