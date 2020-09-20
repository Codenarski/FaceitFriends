document.addEventListener('DOMContentLoaded', function () {
	initPage();
	fillNameOfUserInInputFieldAtStart();
}, false)

function initPage() {
	chrome.storage.sync.get({ profiles: [] }, function (data) {
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

		var plusButton = document.createElement("input");
		plusButton.setAttribute("id", "addFriend");
		plusButton.setAttribute("type", "button");
		plusButton.setAttribute("value", "add");

		plusButton.addEventListener("click", addClick);

		form.appendChild(plusButton);

		document.body.appendChild(form);

		document.body.appendChild(br.cloneNode());
		for (let index = 0; index < data.profiles.length; index++) {
			if (index !== 0) {
				var form = document.getElementById("form");
				var br = document.createElement("br");
				form.appendChild(br);
				var faceitFriendLabel = document.createElement("label");
				var text = "Faceit Friend " + index + ": ";
				var faceitFriendLabelText = document.createTextNode(text);
				faceitFriendLabel.appendChild(faceitFriendLabelText);
				form.appendChild(faceitFriendLabel);

				var faceitFriendInput = document.createElement("input");
				faceitFriendInput.setAttribute("type", "text");
				var inputId = "faceitFriend" + index + "Input";
				faceitFriendInput.setAttribute("id", inputId);
				var faceitFriendName = "faceitFriendName" + index;
				faceitFriendInput.setAttribute("name", faceitFriendName);
				faceitFriendInput.setAttribute("placeholder", "test");
				form.appendChild(faceitFriendInput);
			}
		}
		var button = document.createElement("input");
		button.setAttribute("id", "submit");
		button.setAttribute("type", "submit");
		button.setAttribute("value", "Done");

		document.body.appendChild(button);

		document.getElementById("submit").onclick = function () {
			var form = document.getElementById("form");
			var childs = Array.prototype.slice.call(form);
			var profiles = new Array();
			for (let index = 0; index < childs.length; index++) {
				profiles[index] = childs[index].value;
			}
			var cleanProfiles = profiles.filter(function (value, index, arr) {
				return value != "add" && value != "";
			})
			profiles = cleanProfiles;
			chrome.storage.sync.set({ profiles });
			window.location.assign("popup.html");
		}
	})
}

function addClick() {
	var form = document.getElementById("form");
	var br = document.createElement("br");
	form.appendChild(br);
	var faceitFriendLabel = document.createElement("label");
	var text = "Faceit Friend: ";
	var faceitFriendLabelText = document.createTextNode(text);
	faceitFriendLabel.appendChild(faceitFriendLabelText);
	form.appendChild(faceitFriendLabel);

	var faceitFriendInput = document.createElement("input");
	faceitFriendInput.setAttribute("type", "text");
	var inputId = "faceitFriendInput";
	faceitFriendInput.setAttribute("id", inputId);
	var faceitFriendName = "faceitFriendName";
	faceitFriendInput.setAttribute("name", faceitFriendName);
	faceitFriendInput.setAttribute("placeholder", "Faceit name");
	form.appendChild(faceitFriendInput);
}

function fillNameOfUserInInputFieldAtStart() {
	chrome.storage.sync.get({ profiles: [] }, function (data) {
		var form = document.getElementById("form");
		var childs = Array.prototype.slice.call(form);
		for (let index = 0; index < childs.length; index++) {
			if (index === 0) {
				childs[index].value = data.profiles[index];
			} else if (index === 1) {
				continue;
			} else {
				childs[index].value = data.profiles[index - 1];
			}
		}
	})
}