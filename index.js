import { paintingsData } from "./_data.js";

const changeImageBtn = document.querySelector(".changeImgBtn");
const clearBtn = document.querySelector(".clearBtn");
const author = document.querySelector(".author");
const paintingTitle = document.querySelector(".painting-title");
const paintingDescription = document.querySelector(".painting-description");
const painting = document.querySelector(".painting");
const canvas = document.querySelector(".drawing-board");
const toolbar = document.querySelector(".input-box");
const ctx = canvas.getContext("2d");

const canvasOffsetY = canvas.getBoundingClientRect().y; 
const canvasOffsetX = canvas.getBoundingClientRect().x; 

let id = 0;
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const changeImageHandler = () => {
	if (id < paintingsData.length - 1) {
		id++;
	} else {
		id = 0;
	}

	author.textContent = paintingsData[id].author;
	paintingTitle.textContent = paintingsData[id].title;
	paintingDescription.textContent = paintingsData[id].description;
	painting.style.backgroundImage = paintingsData[id].url;
	clearFn();
};

const drawingFn = e => {
	if (!isPainting) {
		return;
	}
	
	ctx.lineWidth = lineWidth;
	ctx.lineCap = "round";
	ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
	ctx.stroke();
};

const clearFn = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};


changeImageBtn.addEventListener("click", changeImageHandler);

clearBtn.addEventListener("click", clearFn);

toolbar.addEventListener("change", e => {
	if (e.target.id === "stroke") {
		ctx.strokeStyle = e.target.value;
	}

	if (e.target.id === "lineWidth") {
		lineWidth = e.target.value;
	}
});

canvas.addEventListener("mousedown", e => {
	isPainting = true;
	startX = e.target.clientX;
	startY = e.target.clientY;
});

canvas.addEventListener("mouseup", e => {
	isPainting = false;
	ctx.stroke();
	ctx.beginPath();
});

canvas.addEventListener("mousemove", drawingFn);


