import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

///////////////////////////////////////////////////ROUTES
Router.route('/register');

Router.route('/login');

Router.route('/patients', {
	name: 'patients',
    template: 'patients',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
    waitOn: function(){
    	return Meteor.subscribe('patients');
    }
});

Router.route('/therapists', {
	name: 'therapists',
    template: 'therapists',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
    waitOn: function(){ //subscriptions: function(){
    	return Meteor.subscribe('therapists');
    }
});

Router.route('/materials', {
	name: 'materials',
    template: 'materials',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
    waitOn: function(){ //subscriptions: function(){
    	return Meteor.subscribe('materials');
    }
});


Router.route('/', {
	name: 'home',
    template: 'home'
});

Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading'
});

//......................................................................VALIDATION

$.validator.setDefaults({
        rules: { //.......................nicht noetig außer min length
            email: {
            	required: true,
                email: true
            },
            password: {
            	required: true,
                minlength: 6
            }
        },
        messages: {
            email: {
                required: "Bitte geben Sie hier Ihre Mailadresse an.",
                email: "Dies ist keine gueltige Mailadresse."
            },
            password:{
            	required: "Ein Passwort ist notwendig.",
            	minlength: "Ein Passwort muss aus mindestens 6 Zeichen bestehen."
            }
        }
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
    	var currentUser = Meteor.userId();
		return Patientlist.find({ createdBy: currentUser }, {sort: {name: 1}});
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
    	var currentUser = Meteor.userId();
		Meteor.call('insertPatient', 
					patientName, 
					patientDiag, 
					patientAge, 
					currentUser,
					new Date(), 
					( error ) => {
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
    	var currentUser = Meteor.userId();
		return Therapists.find({ createdBy: currentUser }, {sort: {name: 1}});
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
    	var currentUser = Meteor.userId();
	    Meteor.call('insertTherapist', therapistName, currentUser, new Date(), ( error ) => {
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

//.........................................................................MATERIALS
Template.materials.helpers({
    'materials': function(){
    	//console.log('ehm');
    	//Meteor.call('insertMaterial',"PhonoFit", "Sprachentwicklung", "Uwe Ender", "Spiel", "Sissi");
    	//console.log('function called');
        return Materials.find({}, {sort: {name: 1}});
    }
});


Template.materials.events({
	'submit form': function(event){
	    event.preventDefault();
	    var materialName = $('[name="materialName"]').val();
	    var category = $('[name="category"]').val();
	    var creatorName = $('[name="creatorName"]').val();
	    var typ = $('[name="typ"]').val();
    	var currentUser = Meteor.userId();
	    Meteor.call('insertMaterial',materialName, category, creatorName, typ, ( error ) => {
			if ( error ){ console.log( error );			}
		});
    $('[name="materialName"]').val('');
    $('[name="category"]').val('');
    $('[name="creatorName"]').val('');
    $('[name="typ"]').val('');
	}
});

Template.materialItem.events({/*
	'click .delete-material': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Wirklich loeschen?");
		Materials.remove({ _id: documentId });
	}*/
});

//........................................................................REGISTER
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var userName = $('[name=userName]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
        	userName: userName,
		    email: email,
		    password: password
		}, function(error){
		    if(error){
		        console.log(error.reason); // Output error if registration fails
		    } else {
		        Router.go("home"); // Redirect user if registration succeeds
		    }
		});
    }
});

Template.navigation.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Rounter.go('login');  // hide patients/ therapists??
	}
});

Template.login.events({
    'submit form': function(event){
    }
});



Template.login.onCreated(function(){
});

Template.login.onRendered(function(){
    var validator = $('.login').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error){
                if(error){
				    if(error.reason == "User not found"){
				        validator.showErrors({
				            email: "Zu dieser Mailadresse wurde kein Konto gefunden"    
				        });
				    }
				    if(error.reason == "Incorrect password"){
				        validator.showErrors({
				            password: "Dieses Passwort ist nicht korrekt"   
				        });
				    }
                } else {
                    var currentRoute = Router.current().route.getName();
                    if(currentRoute == "login"){
                        Router.go("home");
                    }
                }
            });
        }
    });
});

Template.login.onDestroyed(function(){
});

Template.register.onRendered(function(){
    var validator = $('.register').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
                if(error){
				    if(error.reason == "Email already exists."){
				        validator.showErrors({
				            email: "Diese Mailadresse gehoert bereits zu einem Konto."   
				        });
				    }
                } else {
                    Router.go("home");
                }
            });
        }    
    });
});
/*...............................................eventuell bei mehr Forms default anlegen
*/