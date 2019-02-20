angular.element(document).ready(function () {
  if (window.cordova) {
    console.log("Running in Cordova, will bootstrap AngularJS once 'deviceready' event fires.");
    document.addEventListener('deviceready', function () {
      console.log("Deviceready event has fired, bootstrapping AngularJS.");
      angular.bootstrap(document, ['wannaPizzaApp']);
    }, false);
  } else {
    console.log("Running in browser, bootstrapping AngularJS now.");
    angular.bootstrap(document, ['wannaPizzaApp']);
  }
});

var module = angular.module("wannaPizzaApp",['ngRoute',
                                             'ngAnimate',
                                             'pascalprecht.translate',
                                             'ui.swiper']);

module.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'main.html',
            controller: 'MainController'
    	})
    	.when('/pizzaselection', {
    		templateUrl: 'pizzaselection.html',
            controller: 'PizzaSelectionController'
    	})
      .when('/locations', {
        templateUrl: 'locations.html',
            controller: 'LocationsController'
      })
    	.when('/contact', {
    		templateUrl: 'contact.html',
            controller: 'ContactController'
    	})
      .when('/mydata', {
    		templateUrl: 'mydata.html',
            controller: 'MyDataController'
    	});

});

module.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
      prefix: 'translations/',
      suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
}]);

module.controller("MainController", function($scope) {
});

module.controller("PizzaSelectionController", function($scope) {
});

module.controller("AboutController", function($scope) {
});

module.controller("LocationsController", function($scope) {
});

module.controller("ContactController", function($scope) {
});

module.controller("MyDataController", function($scope) {
});

module.controller("SwipeController", function($scope) {
  $scope.renderBullet = function (index, className) {
    switch (index) {
      case 0:
        return '<span class="' + className + '">Order</span>';
      case 1:
        return '<span class="' + className + '">My Data</span>';
      case 2:
        return '<span class="' + className + '">Contact</span>';
    }
    return "";
};

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
