// this function will be executed when the app is started 
Meteor.startup(function() {

// if it has no quiz available, creates a simple data

if (Quiz.find().count() === 0) { 
	var quizSimples = [ 
		{ pergunta: 'Do you like Meteor?',
		alternativas: [
		{ texto: 'Yes, very!', votos: 0 }, 
		{ texto: 'More or less...', votos: 0 }, 
		{ texto: 'No. Prefer JavaScript', votos: 0 }
		]
		},
		{ 
		pergunta: 'How do you rate this article?', 
		alternativas: [ 
		{ texto: 'bad', votos: 0 },
		 { texto: 'good', votos: 0 }, 
		 { texto: 'excellent', votos: 0 } 
		 ] 
		 } 
		 ]; 

		 // iterates over all quizes and inserts each in the bank 
		  _.each(quizSimple, function(quiz) {
		   Quiz.insert(quiz); 
		   }); 
		} 
		 });
