document.addEventListener('DOMContentLoaded', function () {
	//chrome.storage.sync.clear();
	chrome.storage.sync.get({ profiles: [] }, function (data) {
		buildTable(data);
	})

	document.getElementById("editFriendsButton").onclick = function () {
		window.location.assign("editFriends.html");
	}

}, false)

function getPlayerElo(player, element) {
	chrome.storage.sync.get({ elo: [] }, function (data) {
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
		var text2 = document.createTextNode(data.profiles[index]);
		const request = getEloFromFaceit(data.profiles);
		var text3 = document.createTextNode("Elo: ");
		getPlayerElo(index, td2);

		td1.appendChild(text1);
		td1.appendChild(text2);

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
					chrome.storage.sync.set({ elo });
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