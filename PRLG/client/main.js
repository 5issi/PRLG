import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe('patients');
Meteor.subscribe('therapists');
///////////////////////////////////////////////////ROUTES
Router.route('/register');

Router.route('/login');

Router.route('/patients');

Router.route('/therapists');


Router.route('/', {
	name: 'home',
    template: 'home'
});

Router.configure({
    layoutTemplate: 'main'
});
//.........................................................................PATIENTS
Template.patients.helpers({/*
	'deletePatient': function(){
		Patientlist.remove({name: "Max Mustermann"});
	},
	'addPatient': function(){
		if (PatientList.findOne({name: "Max Mustemann", diagnosis: "Aphasie" }) == false){
			Patientlist.insert({ name: "Max Mustermann", diagnosis: "Aphasie" });
		}
		else { console.log("Ups");}
	},*/
	'patient': function(){
		return Patientlist.find();
	}
});

Template.patients.events({/*
	'click button': function(){
		Meteor.call('insertPatient', "Max Mustermann", "Aphasie", ( error ) => {
			if ( error ){ console.log( error );			}
		});
	}*/	
	'submit form': function(event){
	    event.preventDefault();
	    var patientName = $('[name="patientName"]').val();
	    var patientDiag = $('[name="patientDiag"]').val();
	    var patientAge = $('[date="patientAge"]').val();
		Meteor.call('insertPatient', patientName, patientDiag, patientAge, new Date(), ( error ) => {
			if ( error ){ console.log( error );			}
		});
    $('[name="patientName"]').val('');
    $('[name="patientDiag"]').val('');
    $('[name="patientAge"]').val('');
	}
});

Template.patientItem.events({
	'click .delete-patient': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Wirklich loeschen?");
		Patientlist.remove({ _id: documentId });
	}
});


//.........................................................................THERAPISTS
Template.therapists.helpers({/*
	'deletePatient': function(){
		Patientlist.remove({name: "Max Mustermann"});
	},*/
	'therapist': function(){
		return Therapists.find();
	}
});

Template.therapists.events({/*
	'click button': function(){
		Meteor.call('insertPatient', "Max Mustermann", "Aphasie", ( error ) => {
			if ( error ){ console.log( error );			}
		});
	}*/	
	'submit form': function(event){
	    event.preventDefault();
	    var therapistName = $('[name="therapistName"]').val();
	    Meteor.call('insertTherapist', therapistName, new Date(), ( error ) => {
			if ( error ){ console.log( error );			}
		});
    $('[name="therapistName"]').val('');
	}
});

Template.therapistItem.events({
	'click .delete-therapist': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Wirklich loeschen?");
		Therapists.remove({ _id: documentId });
	}
});

//........................................................................REGISTER
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('home');
    }
});

Template.navigation.events({
	'clocl .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		//Rounter.go('login');
	}
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        console.log(error.reason);
		    } else {
		        Router.go("home");
		    }
		});
    }
});