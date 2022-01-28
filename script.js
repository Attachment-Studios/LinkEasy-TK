
document.getElementById("link").addEventListener("keydown", () => {
	document.getElementById("token").placeholder = document.getElementById("link").value.token();
});

document.getElementById("link").addEventListener("change", () => {
	document.getElementById("token").placeholder = document.getElementById("link").value.token();
});

document.getElementById("go").addEventListener("click", (e) => {
	link = "https://" + document.getElementById("link").value;
	token = document.getElementById("token").value;

	if (token == "") {
		document.getElementById("token").value = document.getElementById("link").value.token();
	}

	token = document.getElementById("token").value;
	error = false;

	if (link == "") {
		error = true;
	}
	if (token == "") {
		error = true;
	}
	if (link.split('.').length < 2) {
		error = true;
	}
	for (subd in link.split('.')) {
		if (String(link.split('.')[subd]).replace('https', 'http').replace('http://', '').length < 2) {
			error = true;
			break;
		}
	}
	for (subd of link.replace('https', 'http').replace('http://', '').split('.')) {
		if ("0123456789".includes(String(subd[0]))) {
			error = true;
			break;
		}
	}

	if (error) {
		document.getElementById("error").innerHTML = "Please provide a valid link!"
		return
	} else {
		document.getElementById("error").innerHTML = ""
	}

	window.location.href = `save?${token}&${link}`;
});

