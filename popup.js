document.addEventListener('DOMContentLoaded', function () {
	//chrome.storage.sync.clear();
	chrome.storage.local.get({ profiles: [] }, function (data) {
		buildTable(data);
	})

	document.getElementById("editFriendsButton").onclick = function () {
		window.location.assign("editFriends.html");
	}

	document.getElementById("donationButton").onclick = function () {
		window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GCMRQ5H74H7QJ", "_blank");
	}

}, false)

function getPlayerElo(player, element) {
	chrome.storage.local.get({ elo: [] }, function (data) {
		var text = document.createTextNode(data.elo[player]);
		element.append(text);
	})
}

function buildTable(data) {
	var table = document.createElement('table');

	for (let index = 0; index < data.profiles.length; index++) {
		var tr1 = document.createElement('tr');
		var tr2 = document.createElement('tr');

		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		td2.setAttribute('id', 'td2');

		var td3 = document.createElement('td');
		td3.setAttribute('id', 'td3')
		var td4 = document.createElement('td');

		if (index === 0) {
			var text1 = document.createTextNode("You: ");
		} else {
			var text1 = document.createTextNode("Friend " + index + ": ");
		}
		var link = document.createElement('a');
		var text2 = document.createTextNode(data.profiles[index]);
		link.appendChild(text2);
		link.href = "https://www.faceit.com/en/players/" + data.profiles[index];
		link.target = "_blank";
		link.setAttribute("class", "FaceitFriendsPlayerProfilLink");
		const request = getEloFromFaceit(data.profiles);
		var text3 = document.createTextNode("Elo: ");
		getPlayerElo(index, td2);

		td1.appendChild(text1);
		td1.appendChild(link);

		td2.appendChild(text3);

		tr1.appendChild(td1);
		tr2.appendChild(td2);

		table.appendChild(tr1);
		table.appendChild(tr2);
		var br = document.createElement("br");
		table.appendChild(br);

		document.body.insertBefore(table, settingsH3);
	}
	var updateButton = document.createElement('button');
	updateButton.setAttribute('value', 'Update');
	updateButton.innerHTML = "Update";
	updateButton.setAttribute("class", "faceitFriendsDefaultButton");
	updateButton.addEventListener("click", function () {
		location.reload();
	});

	document.body.insertBefore(updateButton, settingsH3);
}

function getEloFromFaceit(players) {
	return new Promise(function (resolve, reject) {
		for (let index = 0; index < players.length; index++) {
			var elo = new Array();
			const xhr = new XMLHttpRequest();
			var url = 'https://open.faceit.com/data/v4/players?nickname=' + players[index];
			xhr.open('GET', url);
			xhr.responseType = 'json';
			xhr.setRequestHeader('Authorization', 'Bearer d7cb89ed-9b51-41e7-b581-86f7f8750bca');

			xhr.onload = function () {
				if (this.status >= 200 && this.status < 300) {
					elo[index] = xhr.response.games.csgo.faceit_elo;
					chrome.storage.local.set({ elo });
					resolve(xhr.response.games.csgo.faceit_elo);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = function () {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};
			xhr.send();
		}
	});
}