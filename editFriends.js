/* globals chrome */
document.addEventListener('DOMContentLoaded', function () {
	createPage();
	fillNameOfUserInInputFieldAtStart();

	document.getElementById("submit").onclick = function() {
		//todo: for each formular, read values {
		var profiles = [document.getElementById("yourProfilInput").value]
		//}
		console.log(profiles)
		
		chrome.storage.sync.set({profiles
		}, function() {
			alert("saved")
			console.log(profiles)
		})

		chrome.storage.sync.get(function(profiles) {
			console.log(profiles)
		})
		
		window.location.assign("popup.html");
	} 

}, false)

function createPage() {

	var br = document.createElement("br");

	var headline = document.createElement("h1");
	var headlineText = document.createTextNode("Settings");
		headline.appendChild(headlineText);
		document.body.appendChild(headline);

	var description = document.createElement("p");
	var descriptionText = document.createTextNode("Here you can change your Friends.");
		description.appendChild(descriptionText);
		document.body.appendChild(description);
		document.body.appendChild(br.cloneNode());

	var form = document.createElement("form");
		form.setAttribute("id", "form");

	var inputProfilLabel = document.createElement("label");
	var inputProfilLabelText = document.createTextNode("Your Profil: ");
	inputProfilLabel.appendChild(inputProfilLabelText);
	form.appendChild(inputProfilLabel);

	var inputProfil = document.createElement("input");
		inputProfil.setAttribute("type", "text");
		inputProfil.setAttribute("id", "yourProfilInput");
		inputProfil.setAttribute("name", "Your Profile");
		inputProfil.setAttribute("placeholder", "test"); 
		

	form.appendChild(inputProfil);
	document.body.appendChild(form);

	document.body.appendChild(br.cloneNode());
	
	var button = document.createElement("input");
		button.setAttribute("id", "submit"); 
		button.setAttribute("type", "submit"); 
		button.setAttribute("value", "Done");

	document.body.appendChild(button);
}

function fillNameOfUserInInputFieldAtStart() {
	chrome.storage.sync.get({profiles: []}, function(data) {
		console.log(data);
		if(data.profiles[0] != undefined) {
			document.getElementById("yourProfilInput").value = data.profiles[0];
		}
	})
}