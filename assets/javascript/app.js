(function() {
  //load in the API function
  function displayGifs() {
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
      // console.log(response);
      //empty before appending
      $("#gifView").empty();

      //for each gif, create the image and write to the screen
      for (var j = 0; j < response.data.length; j++) {
        var results = response.data;
        var gifDiv = $("<div>");
        var p = $("<p>");
        p.text("Rating: " + results[j].rating);
        var image = $("<img>");
        var fav = $("<button>");
        var title = $("<p>");
        title.text("Title: " + results[j].title);
        fav.addClass("btn");
        fav.addClass("btn-primary");
        fav.addClass("favorites");
        fav.text("Fav");
        image.attr("src", results[j].images.fixed_height_still.url);
        image.attr("alt", results[j].title);
        image.attr("still", results[j].images.fixed_height_still.url);
        image.attr("motion", results[j].images.fixed_height.url);
        image.addClass("selector");
        // gifDiv.append(title);
        gifDiv.append(p);
        gifDiv.append(image);
        gifDiv.append(fav);
        gifDiv.addClass("inline-block");
        $("#gifView").append(gifDiv);
      }

      //create the onclick event that stops and starts the gif
      $(".selector").on("click", function() {
        if ($(this).attr("src") == $(this).attr("still")) {
          $(this).attr("src", $(this).attr("motion"));
        } else {
          $(this).attr("src", $(this).attr("still"));
        }
      });

      //give the fav buttons a callback that pushes the entire div into an array
      $(".favorites").on("click", function() {
        // console.log(
        //   $(this)
        //     .parent()
        //     .get()
        // );
        favDiv = $(this)
          .parent()
          .get();
        favArray.push(favDiv);
        // console.log(favArray);
      });
    });
  }

  //show all of your gifs that you favorited
  $("#favorite").on("click", function() {
    $("#gifView").empty();

    // console.log("this is the array ", favArray);
    favArray.forEach(div => {
      var thisimg = div[0].childNodes[1];
      $(thisimg).on("click", function() {
        if ($(this).attr("src") == $(this).attr("still")) {
          $(this).attr("src", $(this).attr("motion"));
        } else {
          $(this).attr("src", $(this).attr("still"));
        }
      });

      $("#gifView").append(div);
    });
  });

  //reset your favorite gifs
  $("#reset-favorites").on("click", function() {
    $("#gifView").empty();
    favArray = [];
  });
  //create the array of topics for the gifs
  var topics = ["Party", "Dogs", "Funny"];
  var favArray = [];

  //on submit button press, push .val() to topics array and invoke the creatbuttons function
  $("#submit").on("click", function() {
    var input = $("#input-bar").val();
    topics.push(input);
    createButtons();
  });

  //create the dynamic buttons
  function createButtons() {
    //clear the buttons before render
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var create = $("<button>");
      create.addClass("btn");
      create.addClass("btn-primary");
      create.addClass("btn-selector");
      create.attr("data-name", topics[i]);
      create.text(topics[i]);
      $("#buttons").append(create);
    }
  }

  //display the gifs on click of btn class
  $(document).on("click", ".btn-selector", displayGifs);

  createButtons();
})();
