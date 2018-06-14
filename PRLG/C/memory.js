import './app.html';

Cards = new Mongo.Collection('cards');

if(Meteor.isClient){
   
}

if(Meteor.isServer){
	 Meteor.startup(() => {
	 	Cards.insert({
			cardName: "banane",
			imageUrl: '/public/banane.jpg',
		});
	});
}