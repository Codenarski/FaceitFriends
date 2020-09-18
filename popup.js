document.addEventListener('DOMContentLoaded', function () {

	chrome.storage.sync.get({profiles: []}, function(data) {
		console.log(data)
		var table = document.createElement('table');

		var tr1 = document.createElement('tr');   
		var tr2 = document.createElement('tr');  

		var td1 = document.createElement('td');
		var td2 = document.createElement('td');

		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		
		var text1 = document.createTextNode("You: ");
		var text2 = document.createTextNode(data.profiles[0]);

		var text3 = document.createTextNode("Elo: ");
		var text4 = document.createTextNode("");
		
		td1.appendChild(text1);
		td1.appendChild(text2);

		td2.appendChild(text3);
		td2.appendChild(text4);

		tr1.appendChild(td1);
		tr2.appendChild(td2);
		
		table.appendChild(tr1);
		table.appendChild(tr2);
		
		document.body.insertBefore(table, settingsH3)
	})

document.getElementById("editFriendsButton").onclick = function() {
	window.location.assign("editFriends.html");
}

}, false)