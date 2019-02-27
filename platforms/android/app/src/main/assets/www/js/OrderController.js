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
                                             'ui.swiper',
                                             'ngMaterial',
                                             'ngMessages',
                                             'LocalStorageModule']);


module.config(function (localStorageServiceProvider) {
 localStorageServiceProvider.setPrefix('wannaPizza')
                            .setNotify(true, true);
});

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

module.controller("MainController", function($scope, $mdDialog) {

  var originatorEv;

  $scope.openMenu = function($mdMenu, ev) {
    originatorEv = ev;
    $mdMenu.open(ev);
  };

  $scope.aboutMsg = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .targetEvent(originatorEv)
        .clickOutsideToClose(true)
        .parent('body')
        .title('About')
        .textContent('WannaPizza 2019 - All rights reserved')
        .ok('Close')
    );

    originatorEv = null;
  };

  $scope.goToSlide = function(index) {
    var swiperInstance = document.querySelector('.swiper-container').swiper
    swiperInstance.slideTo(index);
  }
});

module.controller("PizzaSelectionController", function($scope, localStorageService) {
  $scope.pizzaData = localStorageService.get('pizzaData');
  console.log($scope.pizzaData);
  console.log(typeof $scope.pizzaData);
  console.log(JSON.parse($scope.pizzaData));
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
        //throw 'aaa';
      }).catch(function(error) {
        console.log('Error: '+error);
      });
      return promise;
    }
  }
});

module.controller("OrderController", function($rootScope,
                                              orderService,
                                              localStorageService) {

  $rootScope.pizzaOrder = {
    items: []
  };

  orderService.getData()
  .then(function(data) {
    //$rootScope.pizzaData = data;
    //localStorageService.set('pizzaData', data);
    console.log(typeof data);
    var obj = JSON.parse(data);
    console.log(obj);
  }, function(error){
    $('#main-swipe').html('<h3>Error while retrieving data: '+ error +'</h3>');
  }).catch(function(error) {
    console.log('Error: '+error);
});

  $rootScope.addToOrder = function() {
    console.log($rootScope.selectedPizza);
    if($rootScope.selectedPizzaSize) {
      $rootScope.pizzaOrder.items.push({
        qty: 1,
        desc: $rootScope.selectedPizza.name,
        size: $rootScope.selectedPizzaSize.desc,
        price: $rootScope.selectedPizzaSize.price
      });
    }
  }

});
