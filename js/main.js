import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";


// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains('show')) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener('click', function (event) {
  event.stopPropagation();
});
window.addEventListener('click', function () {
  hideBasket();
});


// 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

function showSearch() {
  headerEl.classList.add('searching');
  stopScroll();
  headerMenuEls.reverse().forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.4) / searchDelayEls.length + 's';
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove('searching');
  playScroll();
  headerMenuEls.reverse().forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.4) / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();
  searchInputEl.value = '';
}
function playScroll() {
  document.documentElement.classList.remove('fixed');;
}
function stopScroll() {
  document.documentElement.classList.add('fixed');
}

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener('click', hideSearch);


// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing');
    searchInputEl.value = '';
    playScroll();
  } else {
    headerEl.classList.add('menuing');
    stopScroll();
  }
});


// 헤더 검색
const searchTextFieldEl = document.querySelector('header .text-field');
const searchCancelEl = document.querySelector('header .search-canceler');
searchTextFieldEl.addEventListener('click', function () {
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
});
searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile');
});


// 화면 크기(데스크탑/모바일)에 따라 헤더 부분 제어
window.addEventListener('resize', function () {
  if (this.window.innerWidth <= 740) {
    headerEl.classList.remove('searching');
  }else{
    headerEl.classList.remove('searching--mobile');
  }
})


// 모바일 화면 내비게이션 토글 버튼
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

function showNavMenu() {
  navEl.classList.add('menuing');
}
function hideNavMenu() {
  navEl.classList.remove('menuing');
}

navMenuToggleEl.addEventListener('click', function () {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener('click', function (event) {
  event.stopPropagation();
});
window.addEventListener('click', hideNavMenu);
navMenuShadowEl.addEventListener('click', hideNavMenu);


// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});
const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el) {
  io.observe(el);
});


// 비디오 재생
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function () {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function () {
  video.pause();
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
})


// '당신에게 맞는 iPad는?' 렌더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');
  let colorList = '';
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color:${color};"></li>`
  });
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  itemsEl.append(itemEl);
});


// Footer Navigation
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');
  let mapList = '';
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>
    `
  });
  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;
  navigationsEl.append(mapEl);
});


// Copyright 연도
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();


// 푸터 내비게이션(모바일) 아코디언 메뉴
const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3');
  h3El.addEventListener('click', function () {
    el.classList.toggle('active');
  });
});