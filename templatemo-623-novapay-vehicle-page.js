const vehiclePage = document.getElementById('vehiclePage');
const requestedSlug = new URLSearchParams(window.location.search).get('id');
const vehicle = window.apexVehicles.find((item) => item.slug === requestedSlug);

if (!vehicle) {
  document.title = 'Vehicle not found — Polanco Exotic Cars';
  vehiclePage.innerHTML = `
    <section class="vehicle-not-found">
      <p class="eyebrow"><span></span> Not in this collection</p>
      <h1>That car has taken another road.</h1>
      <p>We couldn’t find that vehicle. Browse our current collection to find your next great drive.</p>
      <a class="button button-red" href="index.html#featured">Back to the collection <span aria-hidden="true">→</span></a>
    </section>
  `;
} else {
  document.title = `${vehicle.name} — Illustrative model | Polanco Exotic Cars`;
  document.querySelector('meta[name="description"]').content = `Explore an illustrative ${vehicle.name} model. Contact Polanco Exotic Cars in Lekki, Lagos, to confirm current availability, specifications and naira pricing.`;
  vehiclePage.innerHTML = `
    <nav class="vehicle-breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a><span aria-hidden="true">/</span><a href="index.html#featured">Featured collection</a><span aria-hidden="true">/</span><span>${vehicle.name}</span>
    </nav>
    <div class="vehicle-layout">
      <div class="vehicle-photo-wrap">
        <img src="https://images.unsplash.com/${vehicle.image}?auto=format&fit=crop&w=1500&q=90" alt="Representative image: ${vehicle.alt}; not a confirmed Polanco stock vehicle">
        <span class="vehicle-photo-tag">ILLUSTRATIVE MODEL</span>
        <span class="vehicle-photo-caption">Representative image · Not confirmed stock</span>
      </div>
      <section class="vehicle-summary" aria-labelledby="vehicleTitle">
        <p class="eyebrow"><span></span> ${vehicle.body}</p>
        <h1 id="vehicleTitle">${vehicle.name.split(' ').slice(0, -1).join(' ')} <em>${vehicle.name.split(' ').slice(-1)}</em></h1>
        <p class="vehicle-subtitle">Illustrative model <span aria-hidden="true">·</span> Exact vehicle details to be confirmed with Polanco</p>
        <div class="vehicle-price-row">
          <div><div class="vehicle-price">${vehicle.price}</div><div class="vehicle-price-note">Indicative Nigerian market estimate; not a Polanco quote.</div></div>
          <span class="vehicle-stock">Confirm availability</span>
        </div>
        <p class="vehicle-summary-copy">This page is an illustrative model example, not a live vehicle listing. Contact Polanco Exotic Cars to confirm whether this model is available and request current photos, year, mileage, condition and a naira quote.</p>
        <div class="vehicle-actions">
          <button class="button button-red" id="vehicleTestDrive" type="button">Enquire about this model <span aria-hidden="true">→</span></button>
          <a class="vehicle-call" href="tel:+2348160155395" aria-label="Call Polanco Exotic Cars">☎</a>
        </div>
        <p class="vehicle-summary-note">Questions? Call Polanco Exotic Cars: +234 816 015 5395</p>
      </section>
    </div>
    <div class="vehicle-content-grid">
      <section aria-labelledby="vehicleSpecsTitle">
        <p class="vehicle-section-kicker">The details</p>
        <h2 class="vehicle-section-title" id="vehicleSpecsTitle">A good fit, <em>down to the details.</em></h2>
        <dl class="vehicle-spec-list">
          <div class="vehicle-spec"><dt>Year of manufacture</dt><dd>Confirm with Polanco</dd></div>
          <div class="vehicle-spec"><dt>Body style</dt><dd>${vehicle.body}</dd></div>
          <div class="vehicle-spec"><dt>Odometer</dt><dd>Confirm with Polanco</dd></div>
          <div class="vehicle-spec"><dt>Powertrain</dt><dd>Confirm for the specific vehicle</dd></div>
          <div class="vehicle-spec"><dt>Drivetrain</dt><dd>Confirm for the specific vehicle</dd></div>
          <div class="vehicle-spec"><dt>Transmission</dt><dd>Confirm for the specific vehicle</dd></div>
          <div class="vehicle-spec"><dt>Indicative price estimate</dt><dd>${vehicle.price}</dd></div>
          <div class="vehicle-spec"><dt>Availability</dt><dd>Confirm with Polanco</dd></div>
        </dl>
      </section>
      <section aria-labelledby="vehicleHighlightsTitle">
        <p class="vehicle-section-kicker">The good stuff</p>
        <h2 class="vehicle-section-title" id="vehicleHighlightsTitle">Made for <em>your kind of drive.</em></h2>
        <div class="vehicle-highlights">
          ${['Ask Polanco whether this model is currently available', 'Request current photos and the full vehicle specification', 'Confirm condition, history and naira pricing before purchase'].map((highlight) => `<div class="vehicle-highlight"><span aria-hidden="true">✳</span>${highlight}</div>`).join('')}
        </div>
      </section>
    </div>
    <p class="vehicle-disclaimer">This is an illustrative model page, not a confirmed listing of a vehicle sold or currently held by Polanco Exotic Cars. Images are representative and are not Polanco stock photos. The broad naira range is a rough Nigerian-market estimate, not a Polanco quote; actual prices vary with model year, condition, mileage, import duties, specification and exchange rates. Confirm current availability and the final price directly with the dealership.</p>
  `;

  const driveDialog = document.getElementById('vehicleDriveDialog');
  const driveForm = document.getElementById('vehicleDriveForm');
  document.getElementById('vehicleTestDrive').addEventListener('click', () => {
    document.getElementById('vehicleDialogCar').textContent = `Enquire about the ${vehicle.name}. Availability must be confirmed with Polanco.`;
    document.getElementById('vehicleDriveMessage').textContent = '';
    driveForm.reset();
    driveDialog.showModal();
  });
  document.getElementById('vehicleDialogClose').addEventListener('click', () => driveDialog.close());
  driveDialog.addEventListener('click', (event) => {
    if (event.target === driveDialog) driveDialog.close();
  });
  driveForm.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('vehicleDriveMessage').textContent = 'This demo form is not connected yet. Please call +234 816 015 5395 or message Polanco on WhatsApp.';
    driveForm.reset();
  });
}
