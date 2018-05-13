import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.quiz.onCreated(function helloOnCreated() {
  
});

Template.quiz.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.quiz.events({
  'click button'(event) {
    // increment the counter when button is clicked
    }
});

Template.questions.helpers({/*
  'deletePatient': function(){
    Patientlist.remove({name: "Max Mustermann"});
  },*/
  'question': function(){
    return Questions.find({sort: {name: 1}});
  }
});

Template.questions.events({/*
  'click button': function(){
    Meteor.call('insertPatient', "Max Mustermann", "Aphasie", ( error ) => {
      if ( error ){ console.log( error );     }
    });
  }*/ 
  'submit form': function(event){
      event.preventDefault();
      var questionText = $('[name="questionText"]').val();
      var questionAnswer1 = $('[name="questionAnswer1"]').val();
      var questionAnswer2 = $('[name="questionAnswer2"]').val();
      var questionAnswer3 = $('[name="questionAnswer3"]').val();
      var answers = [questionAnswer1, questionAnswer2, questionAnswer3];
      Meteor.call('insertQuestion', 
            questionText, 
            answers,
            questionAnswer3
    );

    $('[name="questionText"]').val('');
    $('[name="questionAnswer1"]').val('');
    $('[name="questionAnswer2"]').val('');
    $('[name="questionAnswer3"]').val('');
  }
});

Template.questionItem.events({
});
