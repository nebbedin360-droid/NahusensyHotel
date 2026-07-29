// LocalStorage Keys
const PRICING_KEY = 'nahusenay_prices';
const BOOKINGS_KEY = 'nahusenay_bookings';

// Default Prices
const defaultPrices = {
    family: 5000,
    double: 4000,
    twin: 3000
};

// Initialize App Data on Load
document.addEventListener('DOMContentLoaded', () => {
    loadPrices();
});

/* ==========================================
   PRICING LOGIC
========================================== */
function loadPrices() {
    const savedPrices = JSON.parse(localStorage.getItem(PRICING_KEY)) || defaultPrices;
    
    // Update Display
    document.getElementById('price-family').innerText = `ETB ${Number(savedPrices.family).toLocaleString()} / Night`;
    document.getElementById('price-double').innerText = `ETB ${Number(savedPrices.double).toLocaleString()} / Night`;
    document.getElementById('price-twin').innerText = `ETB ${Number(savedPrices.twin).toLocaleString()} / Night`;

    // Set input values in admin panel
    document.getElementById('edit-family').value = savedPrices.family;
    document.getElementById('edit-double').value = savedPrices.double;
    document.getElementById('edit-twin').value = savedPrices.twin;
}

function saveNewPrices() {
    const newPrices = {
        family: document.getElementById('edit-family').value,
        double: document.getElementById('edit-double').value,
        twin: document.getElementById('edit-twin').value
    };

    localStorage.setItem(PRICING_KEY, JSON.stringify(newPrices));
    loadPrices();
    alert('Room prices updated successfully!');
}

/* ==========================================
   BOOKING LOGIC
========================================== */
function openBookingModal(roomType) {
    document.getElementById('selectedRoomType').value = roomType;
    document.getElementById('modalRoomTitle').innerText = roomType;
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function handleBookingSubmit(event) {
    event.preventDefault();

    const booking = {
        name: document.getElementById('guestName').value,
        phone: document.getElementById('guestPhone').value,
        room: document.getElementById('selectedRoomType').value,
        checkIn: document.getElementById('checkInDate').value,
        nights: document.getElementById('nights').value,
        dateBooked: new Date().toLocaleDateString()
    };

    // Save Booking to LocalStorage
    const currentBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    currentBookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(currentBookings));

    alert(`Thank you, ${booking.name}! Your reservation request for ${booking.room} has been received. We will call you shortly.`);
    
    // Reset Form
    document.getElementById('bookingForm').reset();
    closeBookingModal();
}

/* ==========================================
   ADMIN PANEL LOGIC
========================================== */
function openAdminModal() {
    renderBookingsTable();
    document.getElementById('adminModal').style.display = 'flex';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function renderBookingsTable() {
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    const tbody = document.getElementById('bookingsTableBody');
    tbody.innerHTML = '';

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No bookings received yet.</td></tr>';
        return;
    }

    bookings.forEach(b => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${b.name}</strong></td>
            <td><a href="tel:${b.phone}">${b.phone}</a></td>
            <td>${b.room}</td>
            <td>${b.checkIn}</td>
            <td>${b.nights} night(s)</td>
        `;
        tbody.appendChild(row);
    });
}

// Close modals when clicking outside
window.onclick = function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const adminModal = document.getElementById('adminModal');
    if (event.target === bookingModal) closeBookingModal();
    if (event.target === adminModal) closeAdminModal();
};
