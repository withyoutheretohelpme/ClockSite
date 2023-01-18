const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

const CLOCK_RADIUS = 200;
const MINUTE_LENGTH = 180;
const HOUR_LENGTH = 100;
const SECOND_LENGTH = 180;

function updateClock() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const date = new Date();
	
	ctx.lineWidth = 10;
	ctx.strokeStyle = "#000000";
	
	ctx.beginPath();
	ctx.arc(250, 250, CLOCK_RADIUS, 0, 2 * Math.PI);
	ctx.stroke();
	
	ctx.strokeStyle = "#000000";
	
	for (let i = 0; i < 60; ++i) {
		let th = -i * Math.PI / 30 + Math.PI;
		let f1 = Math.sin(th);
		let f2 = Math.cos(th);
		
		let flag = i % 5 == 0;
		ctx.lineWidth = flag ? 8 : 4;
		let i1 = flag ? 160 : 170;
		
		ctx.beginPath();
		ctx.moveTo(250 + f1 * i1, 250 + f2 * i1);
		ctx.lineTo(250 + f1 * 190, 250 + f2 * 190);
		ctx.stroke();
	}
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000000";
	ctx.font = "30px Times New Roman";
	
	for (let i = 0; i < 12; ++i) {
		let th = -(i + 1) * Math.PI / 6 + Math.PI * 12 / 12;
		let f1 = Math.sin(th);
		let f2 = Math.cos(th);
		
		let s = (i + 1).toString();
		let dim = ctx.measureText(s);
		let xo = 250 + f1 * 130 - dim.width / 2;
		let yo = 260 + f2 * 130;
		ctx.fillText(s, xo, yo);
	}
	
	let modMin = -date.getMinutes() % 60;
	let thMin = modMin * Math.PI / 30 + Math.PI;
	let fm1 = Math.sin(thMin);
	let fm2 = Math.cos(thMin);
	
	ctx.lineWidth = 10;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(250 - fm1 * 30, 250 - fm2 * 30);
	ctx.lineTo(250 + fm1 * MINUTE_LENGTH, 250 + fm2 * MINUTE_LENGTH);
	ctx.stroke();
	
	let modHr = -date.getHours() % 12;
	let thHr = modHr * Math.PI / 6 + Math.PI;
	let fh1 = Math.sin(thHr);
	let fh2 = Math.cos(thHr);
	
	ctx.lineWidth = 20;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(250 - fh1 * 30, 250 - fh2 * 30);
	ctx.lineTo(250 + fh1 * HOUR_LENGTH, 250 + fh2 * HOUR_LENGTH);
	ctx.stroke();
	
	let modS = -date.getSeconds() % 60;
	let thS = modS * Math.PI / 30 + Math.PI;
	let fs1 = Math.sin(thS);
	let fs2 = Math.cos(thS);
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#FF0000";
	ctx.beginPath();
	ctx.moveTo(250 - fs1 * 30, 250 - fs2 * 30);
	ctx.lineTo(250 + fs1 * SECOND_LENGTH, 250 + fs2 * SECOND_LENGTH);
	ctx.stroke();
	
	setTimeout(updateClock, 100);
}

updateClock();