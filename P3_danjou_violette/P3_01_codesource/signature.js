class Signature {
	constructor(canvas){
		this.isDrawing = false;
		this.x = 0;
		this.y = 0;
		this.canvas = document.getElementById(canvas);
		this.context = this.canvas.getContext('2d');
		this.rect = this.canvas.getBoundingClientRect();
		this.context.font = ' 20px Source Sans Pro';
		this.context.fillStyle = 'black';
		this.context.fillText('Signature', 10, 30);
	}

	drawLine(x2, y2) {
		this.context.beginPath();
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 2;
		this.context.moveTo(this.x, this.y);
		this.context.lineTo(x2, y2);
		this.context.stroke();
		this.context.closePath();
		this.x = x2;
		this.y = y2;
	}
}