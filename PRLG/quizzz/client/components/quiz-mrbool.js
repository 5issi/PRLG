Template.quiz.events({
// event to handle the click on the option 
'click .vote': function(event) { 
// prevents double click 
event.preventDefault(); 
// retrieve the quiz parent id 
var idQuiz = $(event.currentTarget).parent('.quiz').data('id'); 
var idVote = $(event.currentTarget).data('id'); 
// create the increment object 
var voteString = 'alternatives.' + idVote + '.votes'; 
var action = {}; 
action[voteString] = 1; 
// increment the number of votes for this option 
Quiz.update( 
	{ _id: idQuiz },
	{ $inc: action }
	);
}
});
