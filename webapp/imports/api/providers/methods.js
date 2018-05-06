import {Meteor} from 'meteor/meteor';
import {Providers} from './collection';

Meteor.methods({
	'providers.search'(params) {
		const regexQuery = {
			$regex: '.*' + (params.filter || '') + '.*', $options: 'i'
		},
		query = {
			name: regexQuery
		},
		options = {
			limit: 10,
			skip: (Number(params.page) - 1) * 10
		};

		return {
			total: Providers.find(query).count(),
			providers: Providers.find(query, options).fetch()
		};
	},
	'providers.insert'(provider) {
		let _id = Providers.insert(provider);
		return _id;
	}
});
