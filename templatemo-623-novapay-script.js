const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mainNav.classList.remove('open');
  });
});

const carGrid = document.getElementById('carGrid');
let carCards = [];
const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
const searchForm = document.getElementById('carSearch');
const searchType = document.getElementById('searchType');
const searchKeyword = document.getElementById('searchKeyword');
const resultsMessage = document.getElementById('resultsMessage');
const noResults = document.getElementById('noResults');
const featuredTrack = document.getElementById('featuredTrack');
const carouselPosition = document.getElementById('carouselPosition');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
let selectedType = 'all';

const featuredVehicles = window.apexVehicles;

carGrid.innerHTML = featuredVehicles.map((vehicle) => {
  const body = vehicle.body.toLowerCase();
  const type = body.includes('electric') ? 'electric'
    : body.includes('suv') ? 'suv'
      : body.includes('sedan') ? 'sedan'
        : body.includes('coupe') || body.includes('supercar') ? 'coupe' : 'other';
  const search = `${vehicle.name} ${vehicle.body}`.toLowerCase();
  return `
    <article class="car-card" data-type="${type}" data-search="${search}">
      <a class="car-image" href="vehicle.html?id=${vehicle.slug}" aria-label="View illustrative model: ${vehicle.name}">
        <img src="https://images.unsplash.com/${vehicle.image}?auto=format&fit=crop&w=1100&q=85" alt="Representative image: ${vehicle.alt}; not confirmed Polanco stock" loading="lazy">
        <span class="car-condition">MODEL EXAMPLE</span><span class="car-heart" aria-hidden="true">♡</span>
      </a>
      <div class="car-details">
        <div class="car-overline">ILLUSTRATIVE MODEL · DETAILS VARY</div>
        <div class="car-title-row"><h3>${vehicle.name}</h3><span class="car-type">${vehicle.body}</span></div>
        <p class="car-specs">Confirm year, condition and specification with Polanco</p>
        <div class="car-bottom"><p class="car-price">${vehicle.price}<span>Indicative Nigerian market estimate</span></p><button class="car-arrow" type="button" data-car="${vehicle.name}" aria-label="Enquire about the ${vehicle.name}">↗</button></div>
      </div>
    </article>
  `;
}).join('');
carCards = Array.from(carGrid.querySelectorAll('.car-card'));

featuredTrack.innerHTML = featuredVehicles.map((vehicle) => `
  <article class="featured-card">
    <a class="featured-card-image" href="vehicle.html?id=${vehicle.slug}" aria-label="View illustrative model details for ${vehicle.name}">
      <img src="https://images.unsplash.com/${vehicle.image}?auto=format&fit=crop&w=720&q=80" alt="Representative image: ${vehicle.alt}; not confirmed Polanco stock" loading="lazy">
      <span class="featured-card-tag">MODEL EXAMPLE</span>
    </a>
    <div class="featured-card-info">
      <p class="featured-card-year">ILLUSTRATIVE MODEL</p>
      <h3><a href="vehicle.html?id=${vehicle.slug}">${vehicle.name}</a></h3>
      <div class="featured-card-bottom">
        <span class="featured-card-price">${vehicle.price}</span>
        <a class="featured-card-link" href="vehicle.html?id=${vehicle.slug}">Ask Polanco <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </article>
`).join('');

function updateCarouselControls() {
  const firstCard = featuredTrack.firstElementChild;
  if (!firstCard) return;
  const step = firstCard.getBoundingClientRect().width + parseFloat(getComputedStyle(featuredTrack).columnGap);
  const lastPosition = featuredTrack.scrollWidth - featuredTrack.clientWidth;
  const index = Math.min(featuredVehicles.length, Math.floor((featuredTrack.scrollLeft + 2) / step) + 1);
  carouselPosition.innerHTML = `${String(index).padStart(2, '0')} <i>/</i> ${String(featuredVehicles.length).padStart(2, '0')}`;
  carouselPrev.disabled = featuredTrack.scrollLeft <= 1;
  carouselNext.disabled = featuredTrack.scrollLeft >= lastPosition - 3;
}

function moveCarousel(direction) {
  const firstCard = featuredTrack.firstElementChild;
  if (!firstCard) return;
  const step = firstCard.getBoundingClientRect().width + parseFloat(getComputedStyle(featuredTrack).columnGap);
  featuredTrack.scrollBy({
    left: step * direction,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
}

carouselPrev.addEventListener('click', () => moveCarousel(-1));
carouselNext.addEventListener('click', () => moveCarousel(1));
featuredTrack.addEventListener('scroll', updateCarouselControls, {passive:true});
window.addEventListener('resize', updateCarouselControls);
updateCarouselControls();

function updateInventory() {
  const keyword = searchKeyword.value.trim().toLowerCase();
  const visibleCars = carCards.filter((card) => {
    const matchesType = selectedType === 'all' || card.dataset.type === selectedType;
    const matchesKeyword = !keyword || card.dataset.search.includes(keyword);
    const isVisible = matchesType && matchesKeyword;
    card.hidden = !isVisible;
    return isVisible;
  });

  visibleCars.forEach((card) => carGrid.appendChild(card));
  noResults.hidden = visibleCars.length > 0;
  resultsMessage.textContent = `${visibleCars.length} illustrative ${visibleCars.length === 1 ? 'model' : 'models'} shown`;
}

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    selectedType = tab.dataset.filter;
    searchType.value = selectedType;
    filterTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    updateInventory();
  });
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  selectedType = searchType.value;
  filterTabs.forEach((tab) => {
    const isActive = tab.dataset.filter === selectedType;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-pressed', String(isActive));
  });
  updateInventory();
  document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' });
});

const driveDialog = document.getElementById('driveDialog');
const dialogCar = document.getElementById('dialogCar');
const driveForm = document.getElementById('driveForm');
const driveMessage = document.getElementById('driveMessage');

document.querySelectorAll('.car-arrow').forEach((button) => {
  button.addEventListener('click', () => {
    dialogCar.textContent = `You’re interested in the ${button.dataset.car}. Contact Polanco to confirm availability and current naira pricing.`;
    driveMessage.textContent = '';
    driveForm.reset();
    driveDialog.showModal();
  });
});

document.getElementById('dialogClose').addEventListener('click', () => driveDialog.close());
driveDialog.addEventListener('click', (event) => {
  if (event.target === driveDialog) driveDialog.close();
});

driveForm.addEventListener('submit', (event) => {
  event.preventDefault();
  driveMessage.textContent = 'This demo form is not connected yet. Call +234 816 015 5395 or message Polanco on WhatsApp.';
  driveForm.reset();
});

document.getElementById('contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  document.getElementById('formMessage').textContent = 'This demo form is not connected yet. Call +234 816 015 5395 or message Polanco on WhatsApp.';
  form.reset();
});

updateInventory();
