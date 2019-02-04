var module = angular.module("wannaPizzaApp", []);

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

  orderService.getData()
  .then(function(data) {
    $scope.pizzaData = data;
  }, function(error){
    $('#container').html('<h3>Error while retrieving data: '+ error +'</h3>');
  });

  $scope.addToOrder = function() {
    console.log($scope.pizzaData);
  }
  // var dataUrl = "https://raw.githubusercontent.com/andrepestana/wannapizza/master/www/data/data.json";
  // $scope.pizzaOrder = {
  //   items: []
  // };
  // var jqxhr = $.getJSON(dataUrl, function(data) {
  //   console.log( "success" );
  //   console.log(data);
  //   $scope.pizzaData = data;
  // })
  // .done(function() {
  //   console.log( "second success" );
  // })
  // .fail(function(e) {
  //   console.log( "error: " + e);
  //   $("#container").html("<p>Couldn't get data from: "+dataUrl+"</p>");
  // })
  // .always(function() {
  //   console.log( "complete" );
  // });
  //
  // jqxhr.complete(function() {
  //   console.log( "second complete" );
  //   // populatePizzasDropdown();
  //   // addEventListenerToButtons();
  // });


  // $scope.$watch('pizzaData', function () {
  //
  //   console.log("pizzaData....")
  //   console.log($scope.pizzaData);
  //
  // });





  // var populatePizzasDropdown = function() {
  //   let dropdown = $('#pizza-dropdown');mainApp
  //   if(!dropdown.length) return;
  //
  //   dropdown.empty();
  //
  //   dropdown.append('<option selected="true" disabled>Choose a Pizza!</option>');
  //   dropdown.prop('selectedIndex', 0);
  //
  //   $.each($scope.pizzaData.pizzas, function (key, entry) {
  //       dropdown.append($('<option></option>').data('value', entry).text(entry.name));
  //   });


  //   $("#pizza-dropdown").on("change", function() {
  //       var selectedPizza = $(this).find(':selected').data('value');
  //
  //       console.log(selectedPizza);
  //       let dropdown = $('#pizza-size-dropdown');
  //
  //       dropdown.empty();
  //
  //
  //       $.each(selectedPizza.sizes, function (key, entry) {
  //           dropdown.append($('<option></option>').data('value', entry).text(entry.size+' - '+entry.price));
  //       });
  //       dropdown.prop('selectedIndex', 0);
  //
  //   });
  // };
  // var addEventListenerToButtons = function() {
  //   if(!$("#add-pizza-to-order").length) return;
  //
  //   $("#add-pizza-to-order").on("click", function() {
  //     var selectedPizza = $('#pizza-dropdown').find(':selected').data('value');
  //     var selectedPizzaSize = $('#pizza-size-dropdown').find(':selected').data('value');
  //     if(selectedPizzaSize) {
  //       window.pizzaOrder.items.push({
  //         qty: 1,
  //         desc: selectedPizza.name,
  //         size: selectedPizzaSize.size,
  //         price: selectedPizzaSize.price
  //       });
  //       var out = '';
  //       $.each(window.pizzaOrder.items, function (i, item) {
  //         out += '<p>'+item.qty+' '+item.desc+' '+item.size+': '+item.price+'</p>';
  //       });
  //       $('#order-summary-div').html(out);
  //     }
  //   });
  // };



});
