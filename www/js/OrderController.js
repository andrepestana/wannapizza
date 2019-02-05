var module = angular.module("wannaPizzaApp",['ngRoute', 'ngAnimate', 'pascalprecht.translate']);

module.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'order.html',
            controller: 'OrderController'
    	})
    	.when('/about', {
    		templateUrl: 'about.html',
            controller: 'AboutController'
    	})
      .when('/services', {
        templateUrl: 'services.html',
            controller: 'ServicesController'
      })
    	.when('/contact', {
    		templateUrl: 'contact.html',
            controller: 'ContactController'
    	})
      .when('/news', {
        templateUrl: 'news.html',
            controller: 'NewsController'
      });

});

module.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
      prefix: '/translations/',
      suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
}]);

module.controller("AboutController", function($scope) {
});

module.controller("ServicesController", function($scope) {
});

module.controller("ContactController", function($scope) {
});

module.controller("NewsController", function($scope) {
});

module.service('orderService', function($http) {

  return {
    getData: function() {
      var promise = $http.get("https://raw.githubusercontent.com/andrepestana/wannapizza/master/www/data/data.json")
      .then(function (response) {
        return response.data;
      });
      return promise;
    }
  }
});

module.controller("OrderController", function($scope, orderService) {

  $scope.pizzaOrder = {
    items: []
  };

  orderService.getData()
  .then(function(data) {
    $scope.pizzaData = data;
  }, function(error){
    $('#container').html('<h3>Error while retrieving data: '+ error +'</h3>');
  });

  $scope.addToOrder = function() {
    console.log($scope.selectedPizza);
    if($scope.selectedPizzaSize) {
      $scope.pizzaOrder.items.push({
        qty: 1,
        desc: $scope.selectedPizza.name,
        size: $scope.selectedPizzaSize.desc,
        price: $scope.selectedPizzaSize.price
      });
    }
  }

});
