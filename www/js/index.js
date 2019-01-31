// Assign handlers immediately after making the request,
// and remember the jqxhr object for this request
var dataUrl = "https://raw.githubusercontent.com/andrepestana/wannapizza/master/www/data/data.json";
window.pizzaOrder = {
  items: []
};
var jqxhr = $.getJSON(dataUrl, function(data) {
  console.log( "success" );
  console.log(data);
  window.pizzaData = data;
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function(e) {
    console.log( "error: " + e);
    $("#container").html("<p>Couldn't get data from: "+dataUrl+"</p>");
  })
  .always(function() {
    console.log( "complete" );
  });

// Perform other work here ...

// Set another completion function for the request above
jqxhr.complete(function() {
  console.log( "second complete" );
  populatePizzasDropdown();
  addEventListenerToButtons();
});

var populatePizzasDropdown = function() {
  let dropdown = $('#pizza-dropdown');

  dropdown.empty();

  dropdown.append('<option selected="true" disabled>Choose a Pizza!</option>');
  dropdown.prop('selectedIndex', 0);

  $.each(window.pizzaData.pizzas, function (key, entry) {
      dropdown.append($('<option></option>').data('value', entry).text(entry.name));
  });


  $("#pizza-dropdown").on("change", function() {
      var selectedPizza = $(this).find(':selected').data('value');
      //var selectedText = $(this).find(':selected').text();
      console.log(selectedPizza);
      let dropdown = $('#pizza-size-dropdown');

      dropdown.empty();


      $.each(selectedPizza.sizes, function (key, entry) {
          dropdown.append($('<option></option>').data('value', entry).text(entry.size+' - '+entry.price));
      });
      dropdown.prop('selectedIndex', 0);

  });
};
var addEventListenerToButtons = function() {
  $("#add-pizza-to-order").on("click", function() {
    var selectedPizza = $('#pizza-dropdown').find(':selected').data('value');
    var selectedPizzaSize = $('#pizza-size-dropdown').find(':selected').data('value');
    if(selectedPizzaSize) {
      window.pizzaOrder.items.push({
        qty: 1,
        desc: selectedPizza.name,
        size: selectedPizzaSize.size,
        price: selectedPizzaSize.price
      });
      var out = '';
      $.each(window.pizzaOrder.items, function (i, item) {
        out += '<p>'+item.qty+' '+item.desc+' '+item.size+': '+item.price+'</p>';
      });
      $('#order-summary-div').html(out);
    }
  });
};
