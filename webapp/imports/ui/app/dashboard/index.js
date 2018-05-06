import angular from 'angular';

import templateUrl from './index.html';

const name = 'app.dashboard';

export default name;

class DashboardController {
	constructor($scope, $reactive, not) {
		$reactive(this).attach($scope);

		this.not = not;
	}

	reload() {
		this.call('notifications.send', 'You need more rest', (err, res) => {
			this.not.primary(res);
		});
	}
}

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.dashboard', {
		url: '/',
		controller: ['$scope', '$reactive', 'Notification', DashboardController],
		controllerAs: 'd',
		templateUrl
	});
}]);
