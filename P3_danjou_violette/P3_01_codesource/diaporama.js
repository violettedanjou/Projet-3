class Diaporama {
	constructor(classdiapo) {
		this.i = 0;
		this.diaporama = document.getElementsByClassName(classdiapo);
		this.firstImage = this.diaporama[this.i];
		this.firstImage.style.display = "block";	
		this.time = 5000;
	}
	
	avancer(){
	this.firstImage = this.diaporama[this.i];
	this.firstImage.style.display = "none";
	this.i++;
	if (this.i > this.diaporama.length-1) {
		this.i = 0;
	}
	this.firstImage = this.diaporama[this.i];
	this.firstImage.style.display = "block";	
	}

	reculer(){
	this.firstImage = this.diaporama[this.i];
	this.firstImage.style.display = "none";
	this.i--;
	if (this.i < 0) {
		this.i = this.diaporama.length-1;
	}
	this.firstImage = this.diaporama[this.i];
	this.firstImage.style.display = "block";
	}
};