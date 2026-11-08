// Edita esta lista para añadir o actualizar tus mixes. Mantén todos los datos aquí.
const mixes = [
	{
		nombre: "Tu primer mix",
		imagen: "", // Ejemplo: "/mixes/mi-primer-mix.jpg" (guarda la imagen dentro de public/)
		urlYouTube: "https://www.youtube.com/@Equiraze",
		generos: "Por definir",
		fecha: "Próximamente",
		duracion: "Por definir",
	},
	{
		nombre: "Tu segundo mix",
		imagen: "", // Ejemplo: "/mixes/mi-segundo-mix.jpg"
		urlYouTube: "https://www.youtube.com/@Equiraze",
		generos: "Por definir",
		fecha: "Próximamente",
		duracion: "Por definir",
	},
];

const mixList = document.querySelector("#mix-list");
const mixCount = document.querySelector("#mix-count");
const mixCover = document.querySelector("#mix-cover");
const mixCoverLink = document.querySelector("#mix-cover-link");
const mixName = document.querySelector("#mix-name");
const mixGenres = document.querySelector("#mix-genres");
const mixDate = document.querySelector("#mix-date");
const mixDuration = document.querySelector("#mix-duration");
const mixNumber = document.querySelector("#mix-number");
const mixYoutubeLink = document.querySelector("#mix-youtube-link");
const coverPlaceholder = document.querySelector("#cover-placeholder");

const padNumber = (number) => String(number).padStart(2, "0");
const formatFact = (value) => Array.isArray(value) ? value.join(" · ") : value;

function renderMix(index) {
	const mix = mixes[index];
	if (!mix) return;

	mixList.querySelectorAll(".mix-list-item").forEach((item) => {
		item.setAttribute("aria-pressed", String(Number(item.dataset.index) === index));
	});
	mixCount.textContent = `${padNumber(index + 1)} / ${padNumber(mixes.length)}`;
	mixNumber.textContent = padNumber(index + 1);
	mixName.textContent = mix.nombre;
	mixGenres.textContent = formatFact(mix.generos);
	mixDate.textContent = mix.fecha;
	mixDuration.textContent = mix.duracion;

	const youtubeUrl = mix.urlYouTube || "https://www.youtube.com/@Equiraze";
	mixCoverLink.href = youtubeUrl;
	mixYoutubeLink.href = youtubeUrl;
	const oldImage = mixCover.querySelector(".cover-image");
	if (oldImage) oldImage.remove();
	coverPlaceholder.hidden = !mix.imagen;

	if (mix.imagen) {
		const image = document.createElement("img");
		image.className = "cover-image";
		image.src = mix.imagen;
		image.alt = `Portada de ${mix.nombre}`;
		image.addEventListener("error", () => {
			image.remove();
			coverPlaceholder.hidden = false;
		}, { once: true });
		mixCover.insertBefore(image, mixCover.querySelector(".cover-play"));
	}
	const name = mix.nombre || `Mix ${padNumber(index + 1)}`;
	mixCoverLink.setAttribute("aria-label", `Abrir ${name} en YouTube`);
	mixYoutubeLink.setAttribute("aria-label", `Escuchar ${name} en YouTube`);
}

mixes.forEach((mix, index) => {
	const button = document.createElement("button");
	button.className = "mix-list-item";
	button.type = "button";
	button.dataset.index = String(index);
	button.setAttribute("aria-pressed", "false");
	const number = document.createElement("span");
	number.className = "mix-list-index";
	number.textContent = padNumber(index + 1);
	const title = document.createElement("span");
	title.className = "mix-list-title";
	title.textContent = mix.nombre;
	const arrow = document.createElement("span");
	arrow.className = "mix-list-arrow";
	arrow.setAttribute("aria-hidden", "true");
	arrow.textContent = "↗";
	button.append(number, title, arrow);
	mixList.append(button);
});

mixList.addEventListener("click", (event) => {
	const button = event.target.closest(".mix-list-item");
	if (button) renderMix(Number(button.dataset.index));
});
renderMix(0);

const nav = document.querySelector("#primary-navigation");
const navToggle = document.querySelector(".nav-toggle");
const mobileLayout = window.matchMedia("(max-width: 680px)");

function syncNavigation() {
	const isMobile = mobileLayout.matches;
	navToggle.hidden = !isMobile;
	nav.hidden = isMobile && navToggle.getAttribute("aria-expanded") !== "true";
	if (!isMobile) navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
	const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
	navToggle.setAttribute("aria-expanded", String(willOpen));
	navToggle.querySelector(".sr-only").textContent = willOpen ? "Cerrar menú" : "Abrir menú";
	nav.hidden = !willOpen;
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
	if (mobileLayout.matches) {
		navToggle.setAttribute("aria-expanded", "false");
		navToggle.querySelector(".sr-only").textContent = "Abrir menú";
		nav.hidden = true;
	}
}));
mobileLayout.addEventListener("change", syncNavigation);
syncNavigation();

const disclaimerDialog = document.querySelector("#disclaimer-dialog");
document.querySelector("#open-disclaimer").addEventListener("click", () => disclaimerDialog.showModal());
document.querySelector("#close-disclaimer").addEventListener("click", () => disclaimerDialog.close());
disclaimerDialog.addEventListener("click", (event) => {
	if (event.target === disclaimerDialog) disclaimerDialog.close();
});
disclaimerDialog.addEventListener("cancel", (event) => {
	event.preventDefault();
	disclaimerDialog.close();
});
document.querySelector("#dialog-contact-link").addEventListener("click", () => disclaimerDialog.close());
