$(document).ready(function() {
	//our nytAPI object
	var nytAPI = {

		searchTopic: "",
		fromYear: 0,
		toYear: 0,
		articleCounter: 0,
		numResults: 0,
		basicQueryURL: "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=f4b9013ebc664a5b8e3d49ae32dc7729&q=",
		//Method that accepts two parameters and gets our data from the nyt server
		dataResponse: function(articles, queryURL) {

			var self = this;
			//our ajax method that retrieves data from the nyt server and then gives it to us when it has fully retrieved the data
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(apiData) {
				//logging our url and apiData parameter which is used as a variable to store the data from the nyt server
				console.log("url: " + queryURL);
				console.log("----------------------");
				console.log(apiData);
				//looping through our articles parameter to display the information needed for each user request
				for ( var i = 0; i < articles; i++) {
					//we increase the articleCounter depending on how many articles the user wants to see
					self.articleCounter++;
					//create a new div and store it in a variable
					var articleHolder = $("<div>");
					//add a class of "holder" to the div
					articleHolder.addClass("holder");
					//add an id to the div of "article-holder-" + however many articles the user requested
					articleHolder.attr("id", "article-holder-" + self.articleCounter);
					//append the div to the new dynamic div to the static div in our html
					$("#articleSection").append(articleHolder);
					//then we set a condition and say "if" all properties of healine are not null do this
					if ( apiData.response.docs[i].headline !== "null") {
						//append a new html element, numbered label and healine, to the articleHolder div
						$("#article-holder-" + self.articleCounter).append("<h3 class='eachHeadline'><span class='label label-primary'>" + self.articleCounter + "</span> <strong>" + apiData.response.docs[i].headline.main + "</strong></h3>");
					}
					//then we add another condition saying "if" the article has byline and byline.original properties do this
					if ( apiData.response.docs[i].byline && apiData.response.docs[i].byline.original) {
						//append a new html element, who the article was written by, to the articleHolder div
						$("#article-holder-" + self.articleCounter).append("<h5>By: " + apiData.response.docs[i].byline.original + "</h5>");
					}
					//we then append the rest of the data we want to display to the user, source, pub date, and link, to the new articleHolder div
					$("#article-holder-" + self.articleCounter).append("<h5>Source: " + apiData.response.docs[i].source + "</h5");
					$("#article-holder-" + self.articleCounter).append("<h5>Published: " + apiData.response.docs[i].pub_date + "</h5>");
					$("#article-holder-" + self.articleCounter).append("<a href='" + apiData.response.docs[i].web_url + "'>" + apiData.response.docs[i].web_url + "</a>");


				}

			});

		},
		//our method for grabbing the users input values
		runSearch: function() {
			//intially sets our article counter to 0
			this.articleCounter = 0;
			//making sure our articleSection div is empty intially
			$("#articleSection").empty();
			//setting our searchTopic to the value of the user's input
			this.searchTopic = $("#articleName").val().trim();
			//creating a new variable and storing in it the api url and the user's input
			var queryURL = this.basicQueryURL + this.searchTopic;
			//grabbing the input values from the number of articles the user wants to see, and dates
			this.numResults = $("#numberOfArticles").val();
			this.fromYear = $("#fromDate").val().trim();
			this.toYear = $("#toDate").val().trim();
			//setting a condition and saying "if" a user selects a year add it to the url. Selecting a year is optional
			if (parseInt(this.fromYear)) {

				queryURL = queryURL + "&begin_date" + this.fromYear + "0315";

			};
			//the same as above
			if (parseInt(this.toYear)) {

				queryURL = queryURL + "&end_date=" + this.toYear + "0301";

			};
			//passing our new url and the number of articles the user would like to see to our dataResponse method
			this.dataResponse(this.numResults, queryURL);
		}
	};
	//selecting our search button to call our runSearch method, grab user input then return data based on our user input
	$("#runTopic").on("click", function(event) {
		//prevents the default function of our form from submitting
		event.preventDefault();
		//calling our runSearch method
		nytAPI.runSearch();

	});
	//finally if the user wants to search for other articles they can clear the div that holds the articles and enter new inputs
	$("#clearAll").on("click", function() {

		this.articleCounter = 0;
		$("#articleSection").empty();

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
