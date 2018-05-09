Template.formQuiz.events({
// handles the submit form
'submit form': function(event) { 
// prevents the form to send more than once
event.preventDefault(); 
// retrieve the form data 
var newQuiz = { 
pergunta: event.target.question.value, 
alternatives: [
{ text: event.target.option1.value, votes: 0 }, 
{ text: event.target.option2.value, votes: 0 }, 
{ text: event.target.option3.value, votes: 0 } 
] 
}; 

// create the new quiz
Quiz.insert(newQuiz);
} 
});
