import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import templateUrl from './index.html';

class ProvidersController {
	constructor($scope, $reactive) {
		$reactive(this).attach($scope);

		this.options = {
			filter: '',
			page: 1
		}

		$scope.$watch(angular.bind(this, () => this.options.page), () => {
			this.search();
		});
	}

	search() {
		this.loading = true;

		this.call('providers.search', this.options, (err, res) => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.providers = res.providers;
			this.total = res.total;
		});
	}
}

const name = 'app.providers';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.providers', {
		abstract: true,
		url: '/providers',
		template: '<div ui-view></div>'
	})
	.state('app.providers.index', {
		url: '',
		controller: ['$scope', '$reactive', ProvidersController],
		controllerAs: 'pp',
		templateUrl
	})
}]);
