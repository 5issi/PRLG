var require = meteorInstall({"collections":{"quiz.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// collections/quiz.js                                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Quiz = new Mongo.Collection('quiz');
///////////////////////////////////////////////////////////////////////

}},"server":{"bootstrap.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/bootstrap.js                                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// this function will be executed when the app is started 
Meteor.startup(function () {
  // if it has no quiz available, creates a simple data
  if (Quiz.find().count() === 0) {
    var quizSimples = [{
      pergunta: 'Do you like Meteor?',
      alternativas: [{
        texto: 'Yes, very!',
        votos: 0
      }, {
        texto: 'More or less...',
        votos: 0
      }, {
        texto: 'No. Prefer JavaScript',
        votos: 0
      }]
    }, {
      pergunta: 'How do you rate this article?',
      alternativas: [{
        texto: 'bad',
        votos: 0
      }, {
        texto: 'good',
        votos: 0
      }, {
        texto: 'excellent',
        votos: 0
      }]
    }]; // iterates over all quizes and inserts each in the bank 

    _.each(quizSimple, function (quiz) {
      Quiz.insert(quiz);
    });
  }
});
///////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/collections/quiz.js");
require("/server/bootstrap.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvY29sbGVjdGlvbnMvcXVpei5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2Jvb3RzdHJhcC5qcyJdLCJuYW1lcyI6WyJRdWl6IiwiTW9uZ28iLCJDb2xsZWN0aW9uIiwiTWV0ZW9yIiwic3RhcnR1cCIsImZpbmQiLCJjb3VudCIsInF1aXpTaW1wbGVzIiwicGVyZ3VudGEiLCJhbHRlcm5hdGl2YXMiLCJ0ZXh0byIsInZvdG9zIiwiXyIsImVhY2giLCJxdWl6U2ltcGxlIiwicXVpeiIsImluc2VydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsT0FBTyxJQUFJQyxNQUFNQyxVQUFWLENBQXFCLE1BQXJCLENBQVAsQzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBQyxPQUFPQyxPQUFQLENBQWUsWUFBVztBQUUxQjtBQUVBLE1BQUlKLEtBQUtLLElBQUwsR0FBWUMsS0FBWixPQUF3QixDQUE1QixFQUErQjtBQUM5QixRQUFJQyxjQUFjLENBQ2pCO0FBQUVDLGdCQUFVLHFCQUFaO0FBQ0FDLG9CQUFjLENBQ2Q7QUFBRUMsZUFBTyxZQUFUO0FBQXVCQyxlQUFPO0FBQTlCLE9BRGMsRUFFZDtBQUFFRCxlQUFPLGlCQUFUO0FBQTRCQyxlQUFPO0FBQW5DLE9BRmMsRUFHZDtBQUFFRCxlQUFPLHVCQUFUO0FBQWtDQyxlQUFPO0FBQXpDLE9BSGM7QUFEZCxLQURpQixFQVFqQjtBQUNBSCxnQkFBVSwrQkFEVjtBQUVBQyxvQkFBYyxDQUNkO0FBQUVDLGVBQU8sS0FBVDtBQUFnQkMsZUFBTztBQUF2QixPQURjLEVBRWI7QUFBRUQsZUFBTyxNQUFUO0FBQWlCQyxlQUFPO0FBQXhCLE9BRmEsRUFHYjtBQUFFRCxlQUFPLFdBQVQ7QUFBc0JDLGVBQU87QUFBN0IsT0FIYTtBQUZkLEtBUmlCLENBQWxCLENBRDhCLENBbUI1Qjs7QUFDQ0MsTUFBRUMsSUFBRixDQUFPQyxVQUFQLEVBQW1CLFVBQVNDLElBQVQsRUFBZTtBQUNqQ2YsV0FBS2dCLE1BQUwsQ0FBWUQsSUFBWjtBQUNDLEtBRkY7QUFHRDtBQUNDLENBNUJKLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlF1aXogPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigncXVpeicpOyIsIi8vIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBhcHAgaXMgc3RhcnRlZCBcclxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24oKSB7XHJcblxyXG4vLyBpZiBpdCBoYXMgbm8gcXVpeiBhdmFpbGFibGUsIGNyZWF0ZXMgYSBzaW1wbGUgZGF0YVxyXG5cclxuaWYgKFF1aXouZmluZCgpLmNvdW50KCkgPT09IDApIHsgXHJcblx0dmFyIHF1aXpTaW1wbGVzID0gWyBcclxuXHRcdHsgcGVyZ3VudGE6ICdEbyB5b3UgbGlrZSBNZXRlb3I/JyxcclxuXHRcdGFsdGVybmF0aXZhczogW1xyXG5cdFx0eyB0ZXh0bzogJ1llcywgdmVyeSEnLCB2b3RvczogMCB9LCBcclxuXHRcdHsgdGV4dG86ICdNb3JlIG9yIGxlc3MuLi4nLCB2b3RvczogMCB9LCBcclxuXHRcdHsgdGV4dG86ICdOby4gUHJlZmVyIEphdmFTY3JpcHQnLCB2b3RvczogMCB9XHJcblx0XHRdXHJcblx0XHR9LFxyXG5cdFx0eyBcclxuXHRcdHBlcmd1bnRhOiAnSG93IGRvIHlvdSByYXRlIHRoaXMgYXJ0aWNsZT8nLCBcclxuXHRcdGFsdGVybmF0aXZhczogWyBcclxuXHRcdHsgdGV4dG86ICdiYWQnLCB2b3RvczogMCB9LFxyXG5cdFx0IHsgdGV4dG86ICdnb29kJywgdm90b3M6IDAgfSwgXHJcblx0XHQgeyB0ZXh0bzogJ2V4Y2VsbGVudCcsIHZvdG9zOiAwIH0gXHJcblx0XHQgXSBcclxuXHRcdCB9IFxyXG5cdFx0IF07IFxyXG5cclxuXHRcdCAvLyBpdGVyYXRlcyBvdmVyIGFsbCBxdWl6ZXMgYW5kIGluc2VydHMgZWFjaCBpbiB0aGUgYmFuayBcclxuXHRcdCAgXy5lYWNoKHF1aXpTaW1wbGUsIGZ1bmN0aW9uKHF1aXopIHtcclxuXHRcdCAgIFF1aXouaW5zZXJ0KHF1aXopOyBcclxuXHRcdCAgIH0pOyBcclxuXHRcdH0gXHJcblx0XHQgfSk7XHJcbiJdfQ==
