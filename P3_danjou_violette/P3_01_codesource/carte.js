class Carte {
	constructor(idmap, lat, long){
		this.OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
		});
		this.idmap = idmap;
		this.lat = lat;
		this.long = long;

		this.greenIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
		});

		this.redIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
		});

		this.blackIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
		});

		this.goldIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
		});

		this.orangeIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
		});
	}

	afficheCarte(){
	this.mymap = L.map(this.idmap, {
	center : [this.lat,this.long],
	zoom : 14,
	layers: [this.OpenStreetMap_HOT]
	});
	}

	afficheMarkers(){
	fetch('https://api.jcdecaux.com/vls/v1/stations?contract=rouen&apiKey=5091f21f031a656c9b15c56e4ee908e5f697d21e')
	.then(response => response.json())
	.then(data =>{

	let iconColor ; 

	var markerGroup = new L.MarkerClusterGroup();

	for (let i = 0; i < data.length; i++){
		let latitude = data[i].position.lat;
		let longitude = data[i].position.lng;

		if (data[i].status === "CLOSED") {iconColor = this.blackIcon;}    // SI la station est fermée, ALORS noir 
			else {iconColor = this.greenIcon;}
			
		if (data[i].available_bikes > 10) {iconColor = this.greenIcon;}  // SI il y a + de 10 vélos, ALORS vert
			else if (data[i].available_bikes < 5) {iconColor = this.orangeIcon;}  //SINON SI il y a - de 5 vélos, ALORS orange 
			else {iconColor = this.goldIcon;} 										// SINON jaune

		if (data[i].available_bikes === 0) {iconColor = this.redIcon;}  // SI il n'y a plus de vélo, ALORS rouge 

		let markers = new L.marker([latitude,longitude],{icon:iconColor});
		markers.number = data[i].number;
		markers.addEventListener("click", function(){

			let urlStation = "https://api.jcdecaux.com/vls/v3/stations/" + this.number + "?contract=rouen&apiKey=5091f21f031a656c9b15c56e4ee908e5f697d21e";

			fetch(urlStation)
			.then(response => response.json())
			.then(station =>{
				document.getElementById('address').textContent = station.address;
				document.getElementById('places').textContent = station.totalStands.availabilities.stands;
				document.getElementById('bikes').textContent = station.totalStands.availabilities.bikes;

	        	if (station.totalStands.availabilities.bikes == 0){  
	        		btnReserv.style.visibility = "hidden";
	        	}
	        		else {btnReserv.style.visibility = "visible"};
			})
		});
		markerGroup.addLayer(markers);
	}
	this.mymap.addLayer(markerGroup);
	});
	}
}