//Code to show all wines here
$(document).ready(function() {
	$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines",
		type: "GET",
		success: function(data) {
			var template = _.template($("#wine-template").html());

			_.each(data, function(wine) {
				$("#wine-container").append(template(wine));
			});
		}
	});
});

//Code to add new Wine
$("#submit-wine").on("click", function () {
	var wineObj = {
		name: $("#name").val(),
		year: $("#year").val(),
		grapes: $("#grapes").val(),
		country: $("#countryry").val(),
		region: $("#region").val(),
		price: $("#price").val(),
		description: $("#description").val(),
		picture: $("#picture").val(),
	}
	$.ajax({
		type: "POST",
		url: "http://daretodiscover.herokuapp.com/wines",
		data: wineObj,
		success: function() {
			window.location.reload();
		},
		error: function() {
			alert("Does not compute.");
		}
	})
});

var $wineId;

//Code to fill in modal to edit a wine
$(document).on("click", ".edit-wine-button", function(event) {
	event.preventDefault();
	$wineId = $(this).data("id");

	$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines/" + $wineId,
		type: "GET",
		success: function(data) {
			$("#edit-name").val(data.name);
			$("#edit-year").val(data.year);
			$("#edit-grapes").val(data.grapes);
			$("#edit-country").val(data.country);
			$("#edit-region").val(data.region);
			$("#edit-price").val(data.price);
			$("#edit-description").val(data.description);
			$("#edit-picture").val(data.picture);

			$("#edit-wine-modal").modal("show");
		}
	});
});

//Code to update a wine here
$("#save-wine").on("click", function() {
	var wineObj = {
		name: $("#edit-name").val(),
		year: $("#edit-year").val(),
		grapes: $("#edit-grapes").val(),
		country: $("#edit-country").val(),
		region: $("#edit-region").val(),
		price: $("#edit-price").val(),
		description: $("#edit-description").val(),
		picture: $("#edit-picture").val(),
	}
	$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines/" + $wineId,
		type: "PUT",
		data: wineObj,
		success: function() {
			window.location.reload();
		},
		error: function() {
			alert("Does not compute.");
		}
	});
});

//Code to delete a wine here
$("#delete-wine").on("click", function() {
	$.ajax({
		url: "http://daretodiscover.herokuapp.com/wines/" + $wineId,
		type: "DELETE",
		success: function() {
			window.location.reload();
		},
		error: function() {
			alert("Does not compute.");
		}
	});
});