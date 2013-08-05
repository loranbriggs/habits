var habitApp = angular.module('habitApp', []);

habitApp.controller('HabitController', function($scope)
{
    $scope.init = function()
    {
        var health = parseInt(localStorage.getItem('health'));
        var money = parseInt(localStorage.getItem('money'));
        var time = parseInt(localStorage.getItem('time'));
        //var visits = parseInt(localStorage.getItem('visits'));
        $scope.points =
        {
            'health': 0,
            'money': 0,
            'time': 0
        };
        if (health)
            $scope.points['health'] = health;
        if (money)
            $scope.points['money'] = money;
        if (time)
            $scope.points['time'] = time + 1;
        /*
        if (visits)
            $scope.visits = visits + 1;
        else
            $scope.visits = 1;
        localStorage.setItem('visits', visits);
        */
    }

    $scope.habits =
    [
        { name: 'run 3 miles', type: 'health', points: 1 },
        { name: 'brush teeth', type: 'health', points: 1 },
        { name: 'eat dessert', type: 'health', points: -1 },
        { name: 'go to movies', type: 'money', points: -1 },
        { name: 'transit instead of driving', type: 'money', points: 1 },
        { name: 'tranfered money to savings', type: 'money', points: 1 },
        { name: 'watch an hour of tv', type: 'time', points: -1 },
        { name: 'do the dishes', type: 'time', points: 1 },
        { name: 'clean the bathroom', type: 'time', points: 1 }
    ];

    $scope.filterType = '';

    $scope.types = ['health', 'money', 'time'];

    $scope.points =
    {
        'health': 0,
        'money': 0,
        'time': 0
    };

    $scope.showPoint = function(type)
    {
        if (type == 'health')
            return $scope.points.health;
        else if (type == 'money')
            return $scope.points.money;
        else if (type == 'time')
            return $scope.points.time;
    }

    $scope.changeFilterType = function(type)
    {
        $scope.filterType = type;
    }

    $scope.doHabit = function(type, value)
    {
        console.log('do habbit function');
        $scope.points[type]+= value;
        localStorage.setItem(type, $scope.points[type]);
    }

    $scope.addHabit = function()
    {
        if ($scope.newHabit.name &&
            $scope.newHabit.type &&
            $scope.newHabit.points)
        {
            $scope.habits.push(
                {
                    name: $scope.newHabit.name,
                    type: $scope.newHabit.type,
                    points: parseInt($scope.newHabit.points)
                });
        }
    }
    
}); 

habitApp.config(function($routeProvider)
{
    $routeProvider
        .when('/',
        {
            controller: 'HabitController',
            templateUrl: 'Partials/View1.html'
        })
        .when('/good',
        {
            controller: 'HabitController',
            templateUrl: 'Partials/good.html'
        })
        .when('/bad',
        {
            controller: 'HabitController',
            templateUrl: 'Partials/bad.html'
        })
        .otherwise(
        {
            redirectTo: '/'
        });
});