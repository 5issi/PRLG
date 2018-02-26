import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

///////////////////////////////////////////////////ROUTES
Router.route('/register');

Router.route('/login');

Router.route('/patients');


Router.route('/', {
	name: 'home',
    template: 'home'
});

Router.configure({
    layoutTemplate: 'main'
});
////////////////////////////////////////////////////TEMPLATE SPECIFICATIONS
Template.patients.helpers({/*
	'deletePatient': function(){
		Patientlist.remove({name: "Max Mustermann"});
	},*/
	'addPatient': function(){
		if (PatientList.findOne({name: "Max Mustemann", diagnosis: "Aphasie" }) == false){
			Patientlist.insert({ name: "Max Mustermann", diagnosis: "Aphasie" });
		}
		else { console.log("Ups");}
	},
	'patient': function(){
		return Patientlist.find();
	}
});