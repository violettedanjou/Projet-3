class Projet3 {
	constructor(){	
	}

	initDiaporama(){
		let monDiaporama = new Diaporama('diaporama_img');
		monDiaporama.Interval = setInterval(function(){monDiaporama.avancer();},monDiaporama.time);


		let button_next = document.getElementById('button_next');
		button_next.addEventListener('click',function(){
		monDiaporama.avancer();
		});

		let button_previous = document.getElementById('button_previous');
		button_previous.addEventListener('click', function(){
		monDiaporama.reculer();
		});

		let button_play = document.getElementById('button_play');
		button_play.addEventListener('click',function(){
		clearInterval(monDiaporama.Interval);
		monDiaporama.Interval = setInterval(function(){monDiaporama.avancer();},monDiaporama.time);
		});

		let button_pause = document.getElementById('button_pause');
		button_pause.addEventListener('click',function(){
		clearInterval(monDiaporama.Interval);
		});

		document.addEventListener('keydown', function(e){
			if (e.key === 'ArrowRight') {
				monDiaporama.avancer();
			}	
			if (e.key === 'ArrowLeft') {
				monDiaporama.reculer();
			}
		});
	}

	initCarte(){
		let maCarte = new Carte("mapid", 49.43, 1.08);
		maCarte.afficheCarte();
		maCarte.afficheMarkers();
	}

	initStorage(){
		let inpName = document.getElementById("inpName");
		let inpSurname = document.getElementById("inpSurname");

		document.getElementById("btnReserv").addEventListener("click", function(e){
			e.preventDefault();
			let name = inpName.value;
			let surname = inpSurname.value;

			if ((name.length > 2) && (surname.length > 2)) { 
				localStorage.setItem("nom", name);
				localStorage.setItem("prenom", surname);
				canvas.style.visibility = "visible";
				divBtn.style.visibility = "visible";
			}
			else {
				canvas.style.visibility = "hidden";
				divBtn.style.visibility = "hidden";
				alert("Veuillez entrer votre nom et votre prénom.");
			}
		});

		if (localStorage.getItem('nom') && localStorage.getItem('prenom')) {
			let myName = localStorage.getItem("nom");
			let mySurname = localStorage.getItem("prenom");
			inpName.value = myName;
			inpSurname.value = mySurname; 
		}
	}

	initCanvas(){
		let maSignature = new Signature("canvas");
		let canvas = document.getElementById("canvas");

		canvas.addEventListener('touchstart', e => {
			maSignature.rect = maSignature.canvas.getBoundingClientRect();
			maSignature.isDrawing = true;
			maSignature.x = e.touches[0].clientX - maSignature.rect.left;
			maSignature.y = e.touches[0].clientY - maSignature.rect.top;
		});

		canvas.addEventListener('touchmove', e => {
			if (maSignature.isDrawing === true) {
			e.preventDefault();
			maSignature.rect = maSignature.canvas.getBoundingClientRect();
			maSignature.drawLine(e.touches[0].clientX - maSignature.rect.left, e.touches[0].clientY - maSignature.rect.top);
			}
		});

		canvas.addEventListener('touchend', e => {
			maSignature.isDrawing = false;
		});

		canvas.addEventListener('mousedown', e => {	
			maSignature.rect = maSignature.canvas.getBoundingClientRect();
			maSignature.isDrawing = true;
			maSignature.x = e.clientX - maSignature.rect.left;
			maSignature.y = e.clientY - maSignature.rect.top;
		});

		canvas.addEventListener('mousemove', e => {
			if (maSignature.isDrawing === true) {
			e.preventDefault();
			maSignature.rect = maSignature.canvas.getBoundingClientRect();
			maSignature.drawLine(e.clientX - maSignature.rect.left, e.clientY - maSignature.rect.top);
			}
		});

		canvas.addEventListener('mouseup', e => {
			if (maSignature.isDrawing === true) {
			maSignature.isDrawing = false;
			}
		});
	}

	initDelete(){
		document.getElementById("btnDelete").addEventListener("click", function(e){
			e.preventDefault();
			canvas.style.visibility = "hidden";
			divBtn.style.visibility = "hidden";
			document.getElementById('address').textContent = "";
			document.getElementById('places').textContent = "";
			document.getElementById('bikes').textContent = "";
			document.getElementById('footer').style.visibility = "hidden";
		});
	}

	initCompteurFooter(){
		let display = document.getElementById('time');
		let monCompteur = new Compteur(1, 0, display);

		document.getElementById("btnOk").addEventListener("click", function(e){
			e.preventDefault();
			canvas.style.visibility = "hidden";
			divBtn.style.visibility = "hidden";
			document.getElementById('footer').style.visibility = "visible";
			sessionStorage.setItem('adresse', document.getElementById('address').textContent);
			document.getElementById('textFooter').textContent = "Vélo réservé pour " + localStorage.getItem('prenom') + " " + localStorage.getItem('nom') + " à la station " + 
			sessionStorage.getItem('adresse') + "." + " Temps restant : ";

			var twentyMinutes = 60 * 1;
			clearInterval(monCompteur.idInterval);
			monCompteur.timeRefresh(1, 0);
			monCompteur.idInterval = setInterval(function(){
				monCompteur.startTimer();
			}, 1000); 
		});

		let minutesStorage = Number(sessionStorage.getItem("minutes"));
		let secondsStorage = Number(sessionStorage.getItem("seconds"));

		if ((minutesStorage == 0) && (secondsStorage == 0)) {
		}
		else {
			footer.style.visibility = "visible";
			monCompteur.timeRefresh(minutesStorage, secondsStorage);
			let minutesAffichage = (sessionStorage.getItem("minutes")); 
			let secondsAffichage = (sessionStorage.getItem("seconds"));
			document.getElementById('textFooter').textContent = "Vélo réservé pour " + localStorage.getItem('prenom') + " " + localStorage.getItem('nom') + " à la station " + 
			sessionStorage.getItem('adresse') + "." + " Temps restant : ";
			document.getElementById("time").textContent = minutesAffichage + ":" + secondsAffichage;

			monCompteur.idInterval = setInterval(function(){
				monCompteur.startTimer();
			}, 1000); 
		}
	}
}