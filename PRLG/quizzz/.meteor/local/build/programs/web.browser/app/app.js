var require = meteorInstall({"client":{"components":{"template.quiz-mrbool-form.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// client/components/template.quiz-mrbool-form.js                                            //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //

Template.__checkName("formQuiz");
Template["formQuiz"] = new Template("Template.formQuiz", (function() {
  var view = this;
  return HTML.Raw('<form> \n\t\t<div class="form-group"> \n\t\t\t<label>Question</label> \n\t\t\t<input type="text" name="question" class="form-control" placeholder="Your Question"> \n\t\t</div> \n\t\t<div class="form-group"> \n\t\t\t<label>Opção #1</label>\n\t\t\t<input type="text" name="option1" class="form-control" placeholder="Option #1"> \n\t\t\t</div> \n\t\t\t<div class="form-group"> \n\t\t\t\t<label>Option #2</label> \n\t\t\t\t<input type="text" name="option2" class="form-control" placeholder="Option #2"> \n\t\t\t</div> \n\t\t\t<div class="form-group"> \n\t\t\t\t<label>Option #3</label> \n\t\t\t\t<input type="text" name="option3" class="form-control" placeholder="Option #3">\n\t\t\t\t </div> \n\n\t\t\t\t <button type="submit" class="btn btn-lg btn-primary btn-block">Create Quiz</button>\n\t\t\t\t  </form>');
}));

///////////////////////////////////////////////////////////////////////////////////////////////

},"template.quiz-mrbool.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// client/components/template.quiz-mrbool.js                                                 //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //

Template.__checkName("quiz");
Template["quiz"] = new Template("Template.quiz", (function() {
  var view = this;
  return HTML.DIV({
    class: "quiz well well-lg",
    "data-id": function() {
      return Spacebars.mustache(view.lookup("_id"));
    }
  }, "\n\t\t", HTML.H3(Blaze.View("lookup:question", function() {
    return Spacebars.mustache(view.lookup("question"));
  })), "\n\t\t", Blaze.Each(function() {
    return Spacebars.dataMustache(view.lookup("indexedArray"), view.lookup("alternatives"));
  }, function() {
    return [ "\n\t\t", HTML.A({
      href: "#",
      class: "vote btn btn-primary btn-block",
      "data-id": function() {
        return Spacebars.mustache(view.lookup("_index"));
      }
    }, "\n\t\t ", HTML.SPAN({
      class: "votes pull-right"
    }, Blaze.View("lookup:votes", function() {
      return Spacebars.mustache(view.lookup("votes"));
    })), "\n\t\t ", HTML.SPAN({
      class: "text"
    }, Blaze.View("lookup:text", function() {
      return Spacebars.mustache(view.lookup("text"));
    })), "\n\t\t"), " \n\t" ];
  }), "\n\t ");
}));

///////////////////////////////////////////////////////////////////////////////////////////////

},"app.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// client/components/app.js                                                                  //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
Template.body.helpers({
  quizes: function () {
    return Quiz.find();
  }
}); // add an index to each item 

UI.registerHelper('indexedArray', function (context, options) {
  if (context) {
    return context.map(function (item, index) {
      item._index = index;
      return item;
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////

},"quiz-mrbool-form.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// client/components/quiz-mrbool-form.js                                                     //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
Template.formQuiz.events({
  // handles the submit form
  'submit form': function (event) {
    // prevents the form to send more than once
    event.preventDefault(); // retrieve the form data 

    var newQuiz = {
      pergunta: event.target.question.value,
      alternatives: [{
        text: event.target.option1.value,
        votes: 0
      }, {
        text: event.target.option2.value,
        votes: 0
      }, {
        text: event.target.option3.value,
        votes: 0
      }]
    }; // create the new quiz

    Quiz.insert(newQuiz);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////

},"quiz-mrbool.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// client/components/quiz-mrbool.js                                                          //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
Template.quiz.events({
  // event to handle the click on the option 
  'click .vote': function (event) {
    // prevents double click 
    event.preventDefault(); // retrieve the quiz parent id 

    var idQuiz = $(event.currentTarget).parent('.quiz').data('id');
    var idVote = $(event.currentTarget).data('id'); // create the increment object 

    var voteString = 'alternatives.' + idVote + '.votes';
    var action = {};
    action[voteString] = 1; // increment the number of votes for this option 

    Quiz.update({
      _id: idQuiz
    }, {
      $inc: action
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////

}},"template.app.body.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// client/template.app.body.js                                                               //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //

Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<!-- It's the quiz creation form here --> \n\t"), HTML.DIV({
    class: "container"
  }, " \n\t\t", HTML.DIV({
    class: "row"
  }, " \n\t\t\t", HTML.DIV({
    class: "col-md-6 col-md-offset-3"
  }, " \n\t\t\t\t", Spacebars.include(view.lookupTemplate("formQuiz")), " \n\t\t\t"), " \n\t\t"), " \n\t"), HTML.Raw(" \n\t <!-- Itera on quizes, displaying them -->\n\t "), HTML.DIV({
    class: "quiz"
  }, " \n\t  ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("quizes"));
  }, function() {
    return [ " \n\t   ", Spacebars.include(view.lookupTemplate("quiz")), " \n\t    " ];
  }), " \n\t     ") ];
}));
Meteor.startup(Template.body.renderToDocument);

///////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"quiz.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// collections/quiz.js                                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
Quiz = new Mongo.Collection('quiz');
///////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
require("/client/components/template.quiz-mrbool-form.js");
require("/client/components/template.quiz-mrbool.js");
require("/client/template.app.body.js");
require("/client/components/app.js");
require("/client/components/quiz-mrbool-form.js");
require("/client/components/quiz-mrbool.js");
require("/collections/quiz.js");