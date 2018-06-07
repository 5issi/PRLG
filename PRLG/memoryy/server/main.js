import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'saveFile': function(buffer){
        Files.insert({data:buffer})         
    }   
});

Meteor.publish('files', function(){
    return Files.find({});
});
