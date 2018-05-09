Template.body.helpers({
	quizes: function() { 
		return Quiz.find();
	}
});

// add an index to each item 
UI.registerHelper('indexedArray', function(context, options) {
	if (context) {
		return context.map(function(item, index) {
			item._index = index; 
			return item; 
		 });
	}
});

