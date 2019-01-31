// Assign handlers immediately after making the request,
// and remember the jqxhr object for this request
var dataUrl = "https://raw.githubusercontent.com/andrepestana/webpack_config/master/package.json";
var jqxhr = $.getJSON(dataUrl, function(data) {
  console.log( "success" );
  console.log(data);
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
    $("#container").html("<p>Couldn't get data from: "+dataUrl+"</p>");
  })
  .always(function() {
    console.log( "complete" );
  });

// Perform other work here ...

// Set another completion function for the request above
jqxhr.complete(function() {
  console.log( "second complete" );

});
