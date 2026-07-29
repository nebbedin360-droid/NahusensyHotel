// LocalStorage keys for persistence
const PRICING_KEY = 'nahusenay_prices';
const BOOKINGS_KEY = 'nahusenay_bookings';
const ADMIN_PASSWORD = 'senay@1234';

// Default prices
const defaultPrices = {
    family: 5000,
    double: 4000,
    twin: 3000
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPrices();
});

// 1. Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Attach event to hamburger button if present
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
}

// 2. Load & Display Prices
function loadPrices() {
    const savedPrices = JSON.parse(localStorage.getItem(PRICING_KEY)) || defaultPrices;
    
    const fam = document.getElementById('price-family');
    const dbl = document.getElementById('price-double');
    const twn = document.getElementById('price-twin');

    if (fam) fam.innerText = `ETB ${Number(savedPrices.family).toLocaleString()} / Night`;
    if (dbl) dbl.innerText = `ETB ${Number(savedPrices.double).toLocaleString()} / Night`;
    if (twn) twn.innerText = `ETB ${Number(savedPrices.twin).toLocaleString()} / Night`;

    const ef = document.getElementById('edit-family');
    const ed = document.getElementById('edit-double');
    const et = document.getElementById('edit-twin');

    if (ef) ef.value = savedPrices.family;
    if (ed) ed.value = savedPrices.double;
    if (et) et.value = savedPrices.twin;
}

// 3. Save Prices (Admin)
function saveNewPrices() {
    const ef = document.getElementById('edit-family');
    const ed = document.getElementById('edit-double');
    const et = document.getElementById('edit-twin');

    if (ef && ed && et) {
        const newPrices = {
            family: ef.value,
            double: ed.value,
            twin: et.value
        };
        localStorage.setItem(PRICING_KEY, JSON.stringify(newPrices));
        loadPrices();
        alert('Prices updated successfully!');
    }
}

// 4. Booking Modal Handlers
function openBookingModal(roomType) {
    const modal = document.getElementById('bookingModal');
    const roomTitle = document.getElementById('modalRoomTitle');
    const selectedInput = document.getElementById('selectedRoomType');

    if (modal) {
        if (roomTitle) roomTitle.innerText = roomType;
        if (selectedInput) selectedInput.value = roomType;
        modal.style.display = 'flex';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.style.display = 'none';
}

function handleBookingSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('guestName')?.value;
    const phone = document.getElementById('guestPhone')?.value;
    const room = document.getElementById('selectedRoomType')?.value;
    const checkIn = document.getElementById('checkInDate')?.value;
    const nights = document.getElementById('nights')?.value;

    const booking = {
        name,
        phone,
        room,
        checkIn,
        nights,
        dateBooked: new Date().toLocaleDateString()
    };

    const currentBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    currentBookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(currentBookings));

    alert(`Thank you, ${name}! Your booking request for ${room} has been received.`);
    
    document.getElementById('bookingForm')?.reset();
    closeBookingModal();
}

// 5. Password Protected Admin
function promptAdminLogin() {
    const enteredPassword = prompt("Enter Admin Password:");
    if (enteredPassword === ADMIN_PASSWORD) {
        openAdminModal();
    } else if (enteredPassword !== null) {
        alert("Incorrect password.");
    }
}

function openAdminModal() {
    renderBookingsTable();
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'flex';
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'none';
}

function renderBookingsTable() {
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    const tbody = document.getElementById('bookingsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No bookings yet.</td></tr>';
        return;
    }

    bookings.forEach(b => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${b.name || '-'}</strong></td>
            <td><a href="tel:${b.phone}">${b.phone || '-'}</a></td>
            <td>${b.room || '-'}</td>
            <td>${b.checkIn || '-'}</td>
            <td>${b.nights || 1} night(s)</td>
        `;
        tbody.appendChild(row);
    });
}

// 6. Global Click to Close Modals
window.onclick = function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const adminModal = document.getElementById('adminModal');
    if (event.target === bookingModal) closeBookingModal();
    if (event.target === adminModal) closeAdminModal();
};
