import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Router.route('/register');

Router.route('/login');



Router.route('/', {
	name: 'home',
    template: 'home'
});

Router.configure({
    layoutTemplate: 'main'
});