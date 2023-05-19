/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
	navToggle = document.getElementById("nav-toggle"),
	navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.add("show-menu");
	});
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
	navClose.addEventListener("click", () => {
		navMenu.classList.remove("show-menu");
	});
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
	const navMenu = document.getElementById("nav-menu");
	// When we click on each nav__link, we remove the show-menu class
	navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
	const header = document.getElementById("header");
	// When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
	if (this.scrollY >= 50) header.classList.add("scroll-header");
	else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
	const scrollUp = document.getElementById("scroll-up");
	// When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
	if (this.scrollY >= 200) scrollUp.classList.add("show-scroll");
	else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.add("active-link");
		} else {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.remove("active-link");
		}
	});
}
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
	distance: "60px",
	duration: 2500,
	delay: 400,
	// reset: true
});

sr.reveal(`.home__header, .section__title`, { delay: 600 });
sr.reveal(`.home__footer`, { delay: 700 });
sr.reveal(`.home__img`, { delay: 900, origin: "top" });

sr.reveal(`.sponsor__img, .footer__logo, .footer__content, .footer__copy`, {
	origin: "top",
	interval: 100,
});
sr.reveal(`.tour__data, .sis__animate`, {
	origin: "left",
	interval: 100,
});
sr.reveal(`.tour__img, .sis__img`, { origin: "right" });

/*=============== SIS BUTTON ===============*/
document
	.getElementById("sisButton")
	.addEventListener("click", function (event) {
		event.preventDefault(); // Prevents the default behavior of the link

		var confirmation = confirm(
			"Are you sure you want to proceed? You will be redirected to a new page."
		);

		if (confirmation) {
			window.location.href = event.target.href; // Redirects to the specified URL
		}
	});

/*=============== LAZY LOAD VIDEO ===============*/
const video = document.getElementById("backgroundVideo");

// Create an IntersectionObserver object.
const observer = new IntersectionObserver((entries) => {
	// Get the first entry from the IntersectionObserver object.
	const entry = entries[0];

	// If the video is visible, then set its src attribute to the video URL.
	if (entry.intersectionRatio > 0) {
		video.src = "assets/video/pup-aerial-compresse.mp4";
	}
});

// Observe the video element.
observer.observe(video);

/*=============== EMAIL SUBSCRIPTION ===============*/
function validateEmail(email) {
	// Regular expression for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function subscribe() {
	const emailInput = document.getElementById("subscribe-email");
	const footerForm = document.querySelector(".footer__form");
	const closeButton = document.querySelector(".close-button");

	const email = emailInput.value;

	if (emailInput.value === "") {
		footerForm.style.border = "2px solid maroon";
		event.preventDefault();
		setTimeout(() => {
			footerForm.style.border = "";
		}, 3000);
	}

	if (validateEmail(email)) {
		// Show the modal
		const modal = document.getElementById("valid-email-modal");
		modal.style.display = "block";
		// Clear the input field
		emailInput.value = "";
		event.preventDefault();

		// Automatically hide the modal after 3 seconds
		setTimeout(() => {
			modal.style.display = "none";
		}, 3000);
	}

	closeButton.addEventListener("click", () => {
		document.getElementById("valid-email-modal").style.display = "none";
	});
}

/*=============== IMAGE MAP LOGIC ===============*/
document.addEventListener("DOMContentLoaded", function () {
	fetch("assets/json/areas.json")
		.then((response) => response.json())
		.then((jsonData) => {
			jsonData.forEach(function (data) {
				const area = document.createElement("area");
				area.dataset.image = data["data-image"];
				area.dataset.name = data["data-name"];
				area.dataset.description = data["data-description"];
				area.dataset.long_description = data["data-long-description"];
				area.coords = data.coords;
				area.shape = data.shape;

				const map = document.querySelector("map[name='image-map']");
				map.appendChild(area);

				const previewBox = createPreviewBox();

				area.addEventListener("mouseover", function () {
					const preview = {
						image: area.dataset.image,
						name: area.dataset.name,
						description: area.dataset.description,
					};

					updatePreviewBox(previewBox, preview);
					document.body.appendChild(previewBox);

					area.style.cursor = "pointer";
				});

				area.addEventListener("mousemove", function (event) {
					const mouseX = event.clientX;
					const mouseY = event.clientY;

					const boxWidth = previewBox.offsetWidth;
					const boxHeight = previewBox.offsetHeight;

					const windowWidth = window.innerWidth;
					const windowHeight = window.innerHeight;

					let left = mouseX - boxWidth / 2;
					let top = mouseY - boxHeight - 10;

					if (left < 0) {
						left = 0;
					} else if (left + boxWidth > windowWidth) {
						left = windowWidth - boxWidth;
					}

					if (top < 0) {
						top = 0;
					} else if (top + boxHeight > windowHeight) {
						top = windowHeight - boxHeight;
					}

					previewBox.style.left = left + "px";
					previewBox.style.top = top + "px";
				});

				area.addEventListener("mouseout", function () {
					previewBox.remove();
				});

				area.addEventListener("click", function () {
					document.body.classList.add("modal-open");
					const modalContent = {
						image: area.dataset.image,
						name: area.dataset.name,
						long_description: area.dataset.long_description,
					};

					const modal = createModal(modalContent);
					document.body.appendChild(modal);

					const closeButton = modal.querySelector(".modal-close");
					closeButton.addEventListener("click", function () {
						modal.remove();
						document.body.classList.remove("modal-open");
					});
				});
			});
		})
		.catch((error) => {
			console.error("Error fetching JSON:", error);
		});

	function createPreviewBox() {
		const previewBox = document.createElement("div");
		previewBox.className = "preview-box";
		previewBox.style.position = "fixed";
		previewBox.style.display = "none";
		previewBox.style.pointerEvents = "none";
		previewBox.style.width = "400px";
		previewBox.style.height = "200px";
		previewBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		previewBox.style.borderRadius = "1rem";

		return previewBox;
	}

	function updatePreviewBox(previewBox, preview) {
		previewBox.innerHTML = `
			<div class="preview-container">
				<div class="preview-name"><strong>${preview.name}</strong></div>
				<div class="preview-description">${preview.description}</div>
			</div>
		`;
		previewBox.style.backgroundImage = `url("${preview.image}")`;
		previewBox.style.display = "block";
		previewBox.style.backgroundSize = "cover";
		previewBox.style.backgroundPosition = "center";
	}

	function createModal(modalContent) {
		const modal = document.createElement("div");
		modal.className = "modal";
		modal.innerHTML = `
			<div class="modal-content">
				<span class="modal-close">&times;</span>
				<img class="modal-image" src="${modalContent.image}" alt="Modal Image">
				<div class="preview-container">
					<div class="preview-name"><strong>${modalContent.name}</strong></div>
					<div class="preview-description">${modalContent.long_description}</div>
				</div>
			</div>
		`;

		return modal;
	}
});
