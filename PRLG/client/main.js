import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

///////////////////////////////////////////////////ROUTES
Router.route('/register', {
    name: 'register',
    template: 'register',
    onBeforeAction: function(){
        this.render('register');
    }
});

Router.route('/login', {
    name: 'login',
    template: 'login',
    onBeforeAction: function(){
        this.render('login');
    }
});

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
        return Meteor.subscribe('therapists');
    }
});

Router.route('/questions', function () {
    this.render('questions');
},  {
    name: 'questions',
    template: 'questions',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
    waitOn: function(){
        return Meteor.subscribe('questions');
    }
});

Router.route('/therapists', function () {
    this.render('therapists');
}, {
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
    	return Meteor.subscribe('patients');
    	return Meteor.subscribe('therapists');
    }
});

Router.route('/materials', function () {
    this.render('materials');
},  {
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

Router.route('/materials/:_id', function () {
    this.render('materialPage');
},  {
	name: 'materialPage',
    template: 'materialPage',
    data: function(){
        var currentMaterial = this.params._id;
        return Materials.findOne({ _id: currentMaterial });
    },
    subscriptions: function(){ //subscriptions: function(){
    	return Meteor.subscribe('materials');
    }
});

Router.route('/books', function () {
    this.render('books');
},  {
	name: 'books',
    template: 'books',
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
    waitOn: function(){ //subscriptions: function(){
    	return Meteor.subscribe('books');
    }
});

Router.route('/books/:_id', function () {
    this.render('bookPage');
},  {
	name: 'bookPage',
    template: 'bookPage',
    data: function(){
        var currentBook = this.params._id;
        return Books.findOne({ _id: currentBook });
    },
    subscriptions: function(){ //subscriptions: function(){
    	return Meteor.subscribe('books');
    }
});

Router.route('/patients/:_id', function () {
    this.render('patientPage');
}, {
	name: 'patientPage',
    template: 'patientPage',
    data: function(){
        var currentPatient = this.params._id;
        return Patientlist.findOne({ _id: currentPatient });
    },
    subscriptions: function(){ //subscriptions: function(){
    	return Meteor.subscribe('patients');
    }
});


Router.route('/', function () {
    this.render('home');
}, {
	name: 'home',
    template: 'home',
    data: function(){
    },
    subscriptions: function(){ //subscriptions: function(){
    	return Meteor.subscribe('questions');
    }
});

Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading'
});

//......................................................................VALIDATION

$.validator.setDefaults({
        rules: { 
        	userName: {
        		required: true,
        		minlength: 4
        	},
        	patientSurName:{
        		required: true,
        		minlength: 2
        	},
        	patientLastName: {
        		required: true,
        		minlength: 2
        	},
        	patientDiag: {
        		required: true
        	},
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
        	userName: {
        		required: "Bitte geben Sie einen Praxisnamen ein.",
        		minlength: "Ihr Praxisname sollte aus mindestens 4 Zeichen bestehen."
        	},
            email: {
                required: "Bitte geben Sie hier Ihre Mailadresse an.",
                email: "Dies ist keine gültige Mailadresse."
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
	},
});

Template.patients.events({/*
	'click button': function(){
		Meteor.call('insertPatient', "Max Mustermann", "Aphasie", ( error ) => {
			if ( error ){ console.log( error );			}
		});
	}*/	
	// add a class="menuitem" to your <li>

    'click .menuitem': function (event) {
        $('#mt-command-dd').text(event.target.text);
    },
    /*
	'click .dropdown-toggle': function (e) {
    e.preventDefault();
    $(e.target).find('.dropdown-menu').toggle();
    },
    */
	'submit form': function(event){
	    event.preventDefault();
	    var patientSurName = $('[name="patientSurName"]').val();
	    var patientLastName = $('[name="patientLastName"]').val();
	    var patientDiag = $('[name="patientDiag"]').val();
	    var patientAge = $('[name="patientAge"]').val().toString();
        console.log(patientAge);
	    var patientGender = $('[name="patientGender"]').val();
    	var currentUser = Meteor.userId();
		Meteor.call('insertPatient', 
					patientSurName, 
					patientLastName,
					patientDiag, 
					patientAge, 
					patientGender,
					currentUser,
					new Date(), 
					( error ) => {
			if ( error ){ console.log( error );	}
		});
    $('[name="patientSurName"]').val('');
    $('[name="patientLastName"]').val('');
    $('[name="patientDiag"]').val('');
    $('[name="patientAge"]').val('');
	}

});

Template.patientItem.events({
	'click .delete-patient': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Möchten Sie den Patienten wirklich löschen?");
		if (confirm){ Patientlist.remove({ _id: documentId }); }
	}
});
//.........................................................................QUESTIONS

Template.questions.helpers({
    'question': function(){
        var currentUser = Meteor.userId();
        return Questions.find({});
    },
});

Template.questions.events({
    'click .menuitem': function (event) {
        $('#mt-command-dd').text(event.target.text);
    },
    'submit form': function(event){
        event.preventDefault();
        Meteor.subscribe('questions');
        var questionText = $('[name="questionText"]').val();
        var questionAnswer1 = $('[name="questionAnswer1"]').val();
        var questionAnswer2 = $('[name="questionAnswer2"]').val();
        var questionAnswer3 = $('[name="questionAnswer3"]').val();
        var answers = [questionAnswer1, questionAnswer2, questionAnswer3];
        console.log("test");
        Meteor.call('insertQuestion', 
            questionText, 
            questionAnswer1, 
            questionAnswer2, 
            questionAnswer3
    );
       console.log("test2");
    $('[name="questionText"]').val('');
    $('[name="questionAnswer1"]').val('');
    $('[name="questionAnswer2"]').val('');
    $('[name="questionAnswer3"]').val('');
  }

});

Template.questionItem.events({
    'click .delete-question': function(event){
        event.preventDefault();
        var documentId = this._id;
        var confirm = window.confirm("Möchten Sie die Frage wirklich löschen?");
        if (confirm){ Questions.remove({ _id: documentId }); }
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
	    var therapistSurName = $('[name="therapistSurName"]').val();
	    var therapistLastName = $('[name="therapistLastName"]').val();
	    var anrede = $('[name="anrede"]').val();
    	var currentUser = Meteor.userId();
	    Meteor.call('insertTherapist', 
	    			therapistSurName, 
	    			therapistLastName, 
	    			anrede, 
	    			currentUser, 
	    			new Date(), 
	    			( error ) => {
			if ( error ){ console.log( error );			}
		});
    $('[name="therapistSurName"]').val('');
    $('[name="therapistLastName"]').val('');
    $('[name="anrede"]').val('');
	}
});

Template.therapistItem.events({
	'click .delete-therapist': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Möchten Sie die Therapeutin wirklich löschen?");
		if (confirm){ Therapists.remove({ _id: documentId }); }
	}
});

//.........................................................................MATERIALS
Template.materials.helpers({
    'material': function(){
        return Materials.find({}, {sort: {materialName: 1}});
    }
});


Template.addMaterial.events({
	'submit form': function(event){
	    event.preventDefault();
	    var materialName = $('[name="materialName"]').val();
	    var partOf = $('[name="partOf"]').val();
	    var category = $('[name="category"]').val();
	    var creatorName = $('[name="creatorName"]').val();
	    var typ = $('[name="typ"]').val();
    	var currentUser = Meteor.userId();
	    Meteor.call('insertMaterial',materialName, partOf, category, creatorName, typ, ( error ) => {
			if ( error ){ console.log( error );			}
		});
    $('[name="materialName"]').val('');
    $('[name="partOf"]').val('');
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

Template.phonoFit.events({
	'submit form': function(event){
	    event.preventDefault();
	    var cardInput = $('[name="cardInput"]').val();
    	//Meteor.call('displayMemory');
    }
});

//........................................................................BOOKS

Template.books.helpers({
    'book': function(){
        return Books.find({}, {sort: {bookName: 1}});
    }
});


Template.addBook.events({
	'submit form': function(event){
	    event.preventDefault();
	    var bookName = $('[name="bookName"]').val();
	    var partOf = $('[name="partOf"]').val();
	    var category = $('[name="category"]').val();
	    var authorName = $('[name="authorName"]').val();
	    var typ = $('[name="typ"]').val();
    	var currentUser = Meteor.userId();
	    Meteor.call('insertBook', bookName, partOf, category, authorName, typ, ( error ) => {
			if ( error ){ console.log( error );	}
		});
    $('[name="bookName"]').val('');
    $('[name="partOf"]').val('');
    $('[name="category"]').val('');
    $('[name="authorName"]').val('');
    $('[name="typ"]').val('');
	}
});

Template.bookItem.events({
});

Template.clicking.events({
	'on-click': function(){
		console.log("hi");
	}
})
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
		Router.go('login'); 
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

Template.patients.onRendered(function(){
	var validator = $('.patients').validate({
	});
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
				            email: "Diese Mailadresse gehört bereits zu einem Konto."   
				        });
				    }
                } else {
                    Router.go("home");
                }
            });
        }
    });
});




/*.
Template.events.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.events.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
    events( start, end, timezone, callback ) {
      let data = Events.find().fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    }
  });
});

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};
..............................................eventuell bei mehr Forms default anlegen
*/