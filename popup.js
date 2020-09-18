document.addEventListener('DOMContentLoaded', function () {

	chrome.storage.sync.get({profiles: []}, function(data) {
		buildTable(data);
	})
	

document.getElementById("editFriendsButton").onclick = function() {
	window.location.assign("editFriends.html");
}

}, false)

function getPlayerElo() {
	chrome.storage.sync.get({elo: []}, function(data) {
		console.log(data.elo);
		var text = document.createTextNode(data.elo);
		document.getElementById("td2").append(text);
	})
}

function buildTable(data) {
	var table = document.createElement('table');

	var tr1 = document.createElement('tr');   
	var tr2 = document.createElement('tr');  

	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	td2.setAttribute('id', 'td2');

	var td3 = document.createElement('td');
	var td4 = document.createElement('td');
	
	var text1 = document.createTextNode("You: ");
	var text2 = document.createTextNode(data.profiles[0]);

	const request = getEloFromFaceit(data.profiles[0]).then(elo => { chrome.storage.sync.set({elo}); });

	var text3 = document.createTextNode("Elo: ");
	getPlayerElo();
	
	td1.appendChild(text1);
	td1.appendChild(text2);

	td2.appendChild(text3);

	tr1.appendChild(td1);
	tr2.appendChild(td2);
	
	table.appendChild(tr1);
	table.appendChild(tr2);
	
	document.body.insertBefore(table, settingsH3);

	var updateButton = document.createElement('button');
	updateButton.setAttribute('value', 'Update');
	updateButton.innerHTML = "Update";
	updateButton.addEventListener ("click", function() {
		location.reload();
	});

	document.body.insertBefore(updateButton,settingsH3);
}

function getEloFromFaceit(player) {
	var faceitElo = 0;
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		var url = 'https://open.faceit.com/data/v4/players?nickname='+player;
		xhr.open('GET', url);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Authorization', 'Bearer d7cb89ed-9b51-41e7-b581-86f7f8750bca');

		xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
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
	})	
}