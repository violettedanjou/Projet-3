class Compteur {
	constructor(minutes, seconds, display){
		this.minutes = minutes;
		this.seconds = seconds;
		this.display = display;
	}

	startTimer() {
	    this.seconds--;
	    if (this.seconds < 0) {
	    	if (this.minutes > 0) {
	    		this.seconds = 59;
	    		this.minutes--;
	    	}
	    else {
	    	clearInterval(this.idInterval);
	    }

	    }
	    if (this.minutes < 10) {
	    	this.minutes = "0" + parseInt(this.minutes);
	    }

	    if (this.seconds < 10) {
	    	this.seconds = "0" + parseInt(this.seconds);
	    }

	    if ((this.seconds != "0-1")) {
	    	this.display.textContent = this.minutes + ":" + this.seconds;
	    }
	    else {
	    	this.seconds = "00";
	    }

		if (this.minutes == 0) {
			if (this.seconds == 0) {
				document.getElementById('address').textContent = "";
				document.getElementById('places').textContent = "";
				document.getElementById('bikes').textContent = "";
				document.getElementById('footer').style.visibility = "hidden";
		    }
		}	
		sessionStorage.setItem("minutes", this.minutes);
	    sessionStorage.setItem("seconds", this.seconds);	    	
	}

	timeRefresh(minutes, seconds){
		this.minutes = minutes;
		this.seconds = seconds;
	}   
}