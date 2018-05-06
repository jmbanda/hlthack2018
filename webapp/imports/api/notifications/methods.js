import {Meteor} from 'meteor/meteor';
import {Notifications} from './collection';
import {Providers} from '../providers';

Meteor.methods({
	'notifications.send'(message) {
		// TODO pull appointments data from athena
		const providers = []
		Providers.find({providerid: {$ne: null}}).forEach(({providerid, name}) => {
			providers.push(name)
			Notifications.insert({
				providerid,
				message,
				read: false
			});
		});

		return 'Provider' + (providers.length>1? 's' : '') + ' ' + providers.join(', ') + ' need' + (providers.length>1? '' : 's') + ' more rest';
	}
});
