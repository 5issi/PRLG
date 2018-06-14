import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
Cards = new Mongo.Collection('cards');
Meteor.startup(() => {
 		Cards.insert({
	cardName: "banane",
	imageUrl: '/public/banane.jpg',

});
});

Meteor.methods({
    'saveFile': function(buffer){
        Files.insert({data:buffer})         
    }   
});

Meteor.publish('files', function(){
    return Files.find({});
});

