const paintingsData = [
	{
		title: "Mona Lisa",
		author: "Leonardo da Vinci",
		description:
			"The Mona Lisa painting is one of the most emblematic portraits in the history of art, where is located at the Louvre. Painted by Leonardo da Vinci in the 16th century, it joined the collections of the court of France before being added to the works on display at the Louvre Museum.",
		url: "url(./img/MonaLisa.jpg)",
	},
	{
		title: "Girl With a Pearl Earring",
		author: "Johannes Vermeer",
		description:
			"Painted around 1665 by, Girl with a Pearl Earring was initially named Girl with a Turban and is undoubtedly a major work of Western art. Often referred to as the “Mona Lisa of the North”, this portrait represents one of the Dutch artist’s daughters.",
		url: "url(./img/Girl_with_pearls.jpg)",
	},
	{
		title: "Self Portrait With Palette",
		author: "Pablo Picasso",
		description:
			"The tough, spare Self-Portrait with a Palette which Picasso painted in Paris in the autumn of 1906 makes a fitting partner to his Portrait of Gertrude Stein and uses allusion in a similar way. This time he seems not to have had much difficulty, and the picture was painted confidently and without major revisions. As if to underline his sense of brotherhood with her, Picasso gave himself the same mask-like, Iberian-style features and hypnotized gaze, and emphasized the mass and strength of his body.",
		url: "url(./img/Picasso.jpg)",
	},
	{
		title: "The Daydream",
		author: "Pierre-Auguste Renoir",
		description:
			"The Daydream or Portrait of Jeanne Samary is an oil on canvas painting by Pierre-Auguste Renoir, from 1877. It is held at the Pushkin Museum, in Moscow. It portrays Jeanne Samary, a young actress at the Comédie-Française in Paris who had made her début as Dorine in Tartuffe in 1875 and lived on Rue Frochot, not far from Renoir's home. He painted her several times.",
		url: "url(./img/Renoir.jpg)",
	},
	{
		title: "Self-Portrait with Thorn Necklace and Hummingbird",
		author: "Frida Kahlo",
		description:
			"Painted by Frida Kahlo in 1940. Although this painting has a small size (about 16x24), it draws lots of interest since it contains so many aspects that are symbolic of Frida Kahlo. One of them is a hummingbird hanging on the thorn, which knots around her throat. Her expression is calm and solemn. It also seems she is patiently enduring the pain. She was not painting a realistic scene but using these symbolic elements to express her feelings. A bird often symbolizes freedom and life. Especially a hummingbird, which is colorful and always hovering above flowers. But in this painting, the hummingbird is black and lifeless. This might be a symbol of Frida herself. Frida spent most of her life in physical pain after the bus accident when she was eighteen. After that, she endured about 35 operations to fix her body. This is a painting about her suffering.",
		url: "url(./img/Frida.jpg)",
	},
	{
		title: "Musica (Melody)",
		author: "Kate Bunce",
		description:
			"In this Pre-Raphaelite portrait, a young woman plays the lyre. Kate Bunce has painted her sister, Myra Bunce. Myra designed metalwork during the Arts and Crafts Movement led by William Morris. They were some of the first women to make a career out of art. If you look closely, you can see an inscription 'MUSICA' on the mirror frame. Myra made many of the frames for her sister’s paintings, and inspired this witty inclusion here.",
		url: "url(./img/Kate_Bunce.jpeg)",
	},
];


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

canvas.addEventListener("touchmove", function (e) {
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);


