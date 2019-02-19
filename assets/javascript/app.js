(function() {
  //load in the API function
  function displayGifs() {
    var key = "api_key=gq1LEbdFF5DgCqqoKUU2w6kvBEROq4qD";
    var gif = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=";

    //clear out the previous button gifs
    $("#gifView").empty();

    $.ajax({
      url:
        queryUrl +
        gif +
        "&" +
        "api_key=gq1LEbdFF5DgCqqoKUU2w6kvBEROq4qD&limit=10",
      method: "GET"
    }).then(function(response) {
      console.log(response);

      //for each gif, create the image
      for (var j = 0; j < response.data.length; j++) {
        var rating = response.data[j].rating;
        var image = "<img src=" + response.data[j].images.original.url + ">";
        var contain = "<span>" + rating + image + "</span>";
        $("#gifView").append(contain);
      }
    });
  }

  //create the array of topics for the gifs
  var topics = ["Party", "Dogs", "Funny"];

  //create the variables to hold my API documentation

  //create the dynamic buttons
  function createButtons() {
    //clear the buttons before render
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var create = $("<button>");
      create.addClass("btn");
      create.addClass("btn-primary");
      create.attr("data-name", topics[i]);
      create.text(topics[i]);
      $("#buttons").append(create);
    }
  }

  //display the gifs on click of btn class
  $(document).on("click", ".btn", displayGifs);

  createButtons();
})();
