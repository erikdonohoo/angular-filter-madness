angular.module('filterMadness', [])
.constant('people', [
	{
		'name': 'Bobby jo',
		'favColor': '#23a8b3',
		'birthday': 1294160581542,
		'likeables': ['cat', 'cow', 'bagel', 'cheese']
	},
	{
		'name': 'Sally Sue',
		'favColor': '#ab8728',
		'birthday': 1372160581542,
		'likeables': ['furniture', 'potato', 'frankfurter']
	},
	{
		'name': 'Goofy Goober',
		'favColor': '#2bca78',
		'birthday': 1334160581542,
		'likeables': ['cat', 'potato', 'seaweed']
	}
])
.controller('MyCtrl', ['$scope', 'people', function ($scope, people) {
	this.people = people;
}])
.filter('betterFilter', ['$filter', function ($filter) {
	return function (list, query) {
		if (!query)
			return list;
		if (query['$'] != null)
			query = query['$'];

		var queries = query.split(' ');

		var newlist = list.slice(0); // Make a copy
		for (var i = queries.length - 1; i >= 0; i--) {
			var results = $filter('filter')(list, queries[i]); // Everything that survived this filter
			for (var j = newlist.length - 1; j >= 0; j--) {
				if (!~results.indexOf(newlist[j])) {
					newlist.splice(j, 1); // Filter final list by each query
				}
			}
		}

		return newlist;
	};
}]);