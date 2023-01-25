
const
	body = document.querySelector('body'),
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


	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	let btnToScroll = $('.btn-to-scroll');
	if (btnToScroll) {
		event.preventDefault();
		let section;

		section = document.querySelector(btnToScroll.getAttribute('href'))

		menu.forEach(elem => {
			elem.classList.remove('_active')
		})

		bodyScrollBar.scrollTo(0, section.offsetTop, section.offsetTop / 1.5);

	}

	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

})


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize;

function resize() {

	windowSize = window.innerWidth;

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
if (document.querySelectorAll('.classicaly__slider').length) {
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
if (document.querySelectorAll('.reasons__slider').length) {
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
if (document.querySelectorAll('.awards__slider').length) {
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
if (document.querySelectorAll('.footer__slider').length) {
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



// =-=-=-=-=-=-=-=-=-=-=-=- <Animation> -=-=-=-=-=-=-=-=-=-=-=-=

var scrollPositionX = 0;
var scrollPositionY = 0;

function isHidden(el) {
	return (el.offsetParent === null)
}


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TimelineMax)

let tl = gsap.timeline();
const animSection = document.querySelectorAll('.anim-section');
let animSectionArray = [];

function sortByIndex(arr) {
	if (windowSize < 980) return arr.sort((a, b) => a.mobIndex > b.mobIndex ? 1 : -1); else return arr.sort((a, b) => a.index > b.index ? 1 : -1);
}

animSection.forEach(animSection => {

	const animElement = animSection.querySelectorAll('.anim-element');

	let animArray = [];
	animElement.forEach(animElement => {
		const index = Number(animElement.dataset.index),
			mobIndex = (Number(animElement.dataset.mobIndex)) ? Number(animElement.dataset.mobIndex) : index;

		animArray.push({ element: animElement, index: index, mobIndex: mobIndex });
	})

	animArray = sortByIndex(animArray);

	let tl = new TimelineMax();
	tl.pause();


	Array.from(animArray).forEach((animArrayElement, index) => {

		const duration = (Number(animArrayElement['element'].dataset.duration)) ? Number(animArrayElement['element'].dataset.duration) : 0.5,
			delay = (Number(animArrayElement['element'].dataset.delay)) ? Number(animArrayElement['element'].dataset.delay) : 0,
			stagger = (Number(animArrayElement['element'].dataset.stagger)) ? Number(animArrayElement['element'].dataset.stagger) : 0.05,
			childrensReverse = (animArrayElement['element'].dataset.childrensReverse == "true") ? true : false;

		if (animArrayElement['element'].classList.contains('anim-text')) {

			tl.to(animArrayElement['element'], {
				//opacity: 1,
				duration: duration,
				delay: delay,
				onStart: function () {

					let spanArray = [];
					animArrayElement['element'].querySelectorAll('.anim-text-line > span').forEach(span => {
						if (!isHidden(span)) spanArray.push(span); else span.style.transform = 'translate3d(0,0%,0)'; span.style.opacity = 1;
					})

					gsap.to(spanArray, {
						transform: 'translate3d(0,0%,0)',
						startAt: {
							transform: 'translate3d(0,100%,0)',
						},
						ease: "power2.out",
						duration: duration,
						stagger: stagger,

					})
				}
			}, (index == 0) ? false : "-=1")

		} else if (animArrayElement['element'].classList.contains('anim-fade-in')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");

		} else if (animArrayElement['element'].classList.contains('anim-fade-up')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				transform: 'translate3d(0,0,0)',
				startAt: {
					transform: 'translate3d(0,25px,0)',
				},
				duration: duration,
				delay: delay,
				onStart: function () {
					animArrayElement['element'].classList.add('_animated');
				}
			}, (index == 0) ? false : "-=1");

		} else if (animArrayElement['element'].classList.contains('anim-fade-right')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				transform: 'translate3d(0,0,0)',
				startAt: {
					transform: 'translate3d(-20px,0,0)',
				},
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");

		} else if (animArrayElement['element'].classList.contains('anim-fade-left')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				transform: 'translate3d(0,0,0)',
				startAt: {
					transform: 'translate3d(20px,0,0)',
				},
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");

		} else if (animArrayElement['element'].classList.contains('anim-zoom-out')) {
			tl.to(animArrayElement['element'], {
				opacity: 1,
				transform: 'scale3d(1,1,1)',
				startAt: {
					transform: 'scale3d(1.1,1.1,1)',
					opacity: 0,
				},
				duration: duration,
				ease: "power2.out",
				delay: delay,
			}, (index == 0) ? false : "-=1");
		} else if (animArrayElement['element'].classList.contains('anim-childrens-fade-right')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				duration: duration,
				delay: delay,
				onStart: function () {

					let childrens = Array.from(animArrayElement['element'].children);

					if (childrensReverse) childrens = childrens.reverse();

					gsap.to(childrens, {
						transform: 'translate3d(0,0,0)',
						opacity: 1,
						startAt: {
							transform: 'translate3d(-20px,0,0)',
							opacity: 0,
						},
						duration: duration,
						stagger: stagger,

					})
				}
			}, (index == 0) ? false : "-=1")

		} else if (animArrayElement['element'].classList.contains('anim-fade-progress-right')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				maskImage: 'linear-gradient(90deg, rgba(72,172,240,1) 100%, transparent 105%)',
				startAt: {
					maskImage: 'linear-gradient(90deg, rgba(72,172,240,1) -5%, transparent 0%)',
				},
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1")

			/* tl.to(animArrayElement['element'], {
				opacity: 1,
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1") */
		} else if (animArrayElement['element'].classList.contains('anim-childrens-fade-left')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				duration: duration,
				delay: delay,
				onStart: function () {

					let childrens = Array.from(animArrayElement['element'].children);

					if (childrensReverse) childrens = childrens.reverse();

					gsap.to(childrens, {
						transform: 'translate3d(0,0,0)',
						opacity: 1,
						startAt: {
							transform: 'translate3d(20px,0,0)',
							opacity: 0,
						},
						duration: duration,
						stagger: stagger,

					})
				}
			}, (index == 0) ? false : "-=1")

		} else if (animArrayElement['element'].classList.contains('anim-zoom-in')) {

			tl.to(animArrayElement['element'], {
				opacity: 1,
				transform: 'scale3d(1,1,1)',
				startAt: {
					transform: 'scale3d(0.7,0.7,1)',
				},
				duration: duration,
				delay: delay,

			}, (index == 0) ? false : "-=1")

		} else if (animArrayElement['element'].classList.contains('anim-clip-down')) {
			tl.to(animArrayElement['element'], {
				opacity: 1,
				clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
				startAt: {
					clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
					opacity: 1,
				},
				ease: "power2.out",
				duration: duration,
				delay: delay,
			}, (index == 0) ? false : "-=1");
		}

	})

	animSection.style.opacity = 1;
	animSectionArray.push([animSection, tl]);

})

function animScroll() {

	Array.from(animSectionArray).forEach((animArrayElement, index) => {
		const element = animArrayElement[0],
			offset = (Number(animArrayElement[0].dataset.offset)) ? Number(animArrayElement[0].dataset.offset) : 0;
		elementCoords = element.getBoundingClientRect();

		if (window.innerHeight / 1.5 - offset > elementCoords.top && !element.classList.contains('_animated')) {
			element.classList.add('_animated')
			animArrayElement[1].play();
		}
	})
}

const scrollImages = document.querySelectorAll('.anim-scroll-image');

animScroll()

function smoothScrollbarInit() {

	var bodyScroll = document.getElementById("main-scrollbar");

	bodyScrollBar = Scrollbar.init(bodyScroll, {
		damping: 0.05,
		// renderByPixels: !('ontouchstart' in document),
		delegateTo: document,
	});

	bodyScrollBar.addListener(({ offset }) => {

		scrollPositionX = offset.x;
		scrollPositionY = offset.y;

		scrollImages.forEach(scrollImage => {

			if (scrollImage.dataset.pos == "to-bottom") {

				if (document.querySelector(scrollImage.dataset.anchor).offsetTop > scrollPositionY - (window.innerHeight)) {
					scrollImage.style.transform = `translate3d(0,${offset.y / 7}px,0)`;
				}

			} else {

				if (document.querySelector(scrollImage.dataset.anchor).offsetTop > scrollPositionY - (window.innerHeight / 2)) {
					let result = (document.querySelector(scrollImage.dataset.anchor).offsetTop - offset.y) / 30;
					if (result >= 25) result = 25; else if (result <= -25) result = -25;

					scrollImage.style.transform = `translate3d(0,${result}px,0)`;
				}
			}

		})

		animScroll()

	});

}

smoothScrollbarInit();
bodyScrollBar.setPosition(0, 0);
bodyScrollBar.track.xAxis.element.remove();

const startImage = document.querySelector('.start-image');

startImage.addEventListener('load', function () {
	const lazyLoading = document.querySelectorAll('.lazy-loading');
	lazyLoading.forEach(lazyElement => {
		lazyElement.setAttribute('src', lazyElement.dataset.src);
		//lazyElement.load();

		const parent = lazyElement.closest('picture');
		if(parent) {
			parent.querySelectorAll('[data-webp-image]').forEach(webpImage => {
				webpImage.setAttribute('srcset', webpImage.dataset.webpImage);
			})
		}
		
		//lazyElement.load();
	})

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
				<img src="${storeysItem.dataset.image}" alt="" width="0" height="0">
			</picture>
		</div>
		`);

		delete storeysItem.dataset.webpImage;
		delete storeysItem.dataset.image;
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </Animation> -=-=-=-=-=-=-=-=-=-=-=-=
