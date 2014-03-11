angular.module('filterMadness', [])

.constant('people', [
	{
		'name': 'Pistol Pete',
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
	},
	{
		'name': 'Billy Beauregard',
		'favColor': '#67fe89',
		'birthday': 1223160581542,
		'likeables': ['catsup', 'onion', 'bacon']
	},
	{
		'name': 'Hungry Pete',
		'favColor': '#2647bb',
		'birthday': 18737160581542,
		'likeables': ['lance', 'dirt', 'artichoke']
	},
	{
		'name': 'Fantasic Fred',
		'favColor': '#bc67ca',
		'birthday': 1309160581542,
		'likeables': ['catmandu', 'soil', 'shangri la']
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
}])

.filter('dateSearch', ['$filter', function ($filter) {

	// List of angular filters to match against
	var filters = ['medium','short','fullDate','M/d/yyyy', 'MMM yyyy', 'MMMM yyyy', 'longDate', 'MMMM d yyyy'];
	return function (list, query) {

		if (!query || !list)
			return list;

		var matches = [];

		// Go through each piece and see if it matches
		angular.forEach(list, function (item) {

			// Go through each property on item
			for (prop in item) {

				// If property is date-ish and object has this property
				if (item.hasOwnProperty(prop) && (angular.isDate(item[prop]) || angular.isNumber(item[prop]))) {

					// Match against filters
					var match = false;
					for (var i = 0; i < filters.length; i++) {
						if (~$filter('date')(item[prop], filters[i]).toLowerCase().indexOf(query.toLowerCase())) {
							if (!~matches.indexOf(item)) // Make sure we didn't add this item because of some other property
								matches.push(item);
							break;
						}
					}

				}
			}
		});

		return matches;
	};
}])