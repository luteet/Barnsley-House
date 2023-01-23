
const body = document.querySelector('body'),
		html = document.querySelector('html'),
		menu = document.querySelectorAll('.header__burger, .header__nav, body'),
		burger = document.querySelector('.header__burger'),
		header = document.querySelector('.header');


body.addEventListener('click', function (event) {

		function $(elem) {
			return event.target.closest(elem)
		}

		// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

		if ($('.header__burger')) {
				menu.forEach(element => {
						element.classList.toggle('_active')
				})
		}

		// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-

})


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

function resize() {

html.style.setProperty("--height-screen", window.innerHeight + "px")
html.style.setProperty("--height-header", header.offsetHeight + "px")

}

resize();

window.onresize = resize;

window.onscroll = function () {
	html.style.setProperty("--height-screen", window.innerHeight + "px")
}

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let classicalySlider;
if(document.querySelectorAll('.classicaly__slider').length) {
	classicalySlider = new Swiper('.classicaly__slider', {
		
		spaceBetween: 0,
		slidesPerView: "auto",
		centeredSlides: true,

		loop: true,
		speed: 500,
		
		navigation: {
			nextEl: '.classicaly__nav--arrow.swiper-button-next',
			prevEl: '.classicaly__nav--arrow.swiper-button-prev',
		},
		breakpoints: {
			600: {
				speed: 1500,
			},
		}
	});
}

let reasonsSlider;
if(document.querySelectorAll('.reasons__slider').length) {
	reasonsSlider = new Swiper('.reasons__slider', {
		
		spaceBetween: 0,
		slidesPerView: "auto",
		centeredSlides: false,

		speed: 1000,
		
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			600: {
				speed: 2000,
			},
		}
	});
}

let awardsSlider;
if(document.querySelectorAll('.awards__slider').length) {
	awardsSlider = new Swiper('.awards__slider', {
		
		spaceBetween: 30,
		slidesPerView: "auto",
		centeredSlides: false,

		speed: 1000,

		navigation: {
			nextEl: '.awards__nav--arrow.swiper-button-next',
			prevEl: '.awards__nav--arrow.swiper-button-prev',
		},
		breakpoints: {
			600: {
				speed: 2000,
			},
		}
	});
}

let footerSlider;
if(document.querySelectorAll('.footer__slider').length) {
	footerSlider = new Swiper('.footer__slider', {

		spaceBetween: 15,
		slidesPerView: "auto",

		speed: 500,

		breakpoints: {
			490: {
				spaceBetween: 37,
			},
		}

	});
}


// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=

const storeysItem = document.querySelectorAll('.storeys__item');
storeysItem.forEach(storeysItem => {
	const body = storeysItem.querySelector('.storeys__item--body'),
				bodyClone = body.cloneNode(true);

	storeysItem.append(bodyClone);
	bodyClone.classList.add('_clone')

	bodyClone.insertAdjacentHTML("afterbegin", `
	<div class="storeys__item--bg">
		<picture>
			<source srcset="${storeysItem.dataset.webpImage}" type="image/webp">
			<img src="${storeysItem.dataset.image}" alt="" width="0" height="0" loading="lazy">
		</picture>
	</div>
	`);

	delete storeysItem.dataset.webpImage;
	delete storeysItem.dataset.image;
})

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	//disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
