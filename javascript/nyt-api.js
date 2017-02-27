$(document).ready(function() {

	var nytAPI = {

		authKey: "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
		searchTopic: "",
		fromYear: 0,
		toYear: 0,
		numArticles: 0,
		numResults: 0,
		basicQueryURL: "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + this.authKey + "&q=",

		responseData: function(this.numResults, queryURL) {

		},

		runSearch: function() {

			this.numArticles = 0;
			$("#articleSection").empty();
			this.searchTopic = $("#articleName").val().trim();
			var queryURL = this.basicQueryURL + this.searchTopic;
			this.numResults = $("#numberOfArticles").val();
			this.fromYear = $("#fromDate").val().trim();
			this.toYear = $("#toDate").val().trim();
			if (parseInt(this.fromYear)) {

				queryURL = queryURL + "&begin_date" + this.fromYear + "0315";

			};

			if (parseInt(this.toYear)) {

				queryURL = queryURL + "&end_date=" + this.toYear + "0315";

			};

			this.responseData(this.numResults, queryURL);
		},
	};

	$("#runTopic").on("click", function(event) {

		event.preventDefault();
		nytAPI.runSearch();

	});

});

//grab all user's input values and associate them with the "search button"
//grab value entered by the user in the text "article name" field
//this value will be used in the api url to return data based on the users input
//next we grab the number of articles the user would like to see
//the user has the option to see 1, 5, and 10 articles
//once the user selects how many articles they would like to see we need to grab the number value and associate it with the api url
//we then need to grab the year value, if user choose to enter a year, and associate it with the api url 
//next we will need to dynamically create divs to hold the amount of articles chosen by the user
//articles need to display the person who wrote the aritcle and the title of the article next to the number of the articel returned
//lastly our clear results button is going to clear the div where the articles are held
