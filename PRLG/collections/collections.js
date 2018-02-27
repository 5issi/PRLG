import { Mongo } from 'meteor/mongo';

Patientlist = new Mongo.Collection('patients');

Therapists = new Mongo.Collection('therapists');
/*
Patientlist.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Patientlist.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

*/