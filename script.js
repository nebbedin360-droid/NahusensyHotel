const PRICING_KEY = 'nahusenay_prices';
const BOOKINGS_KEY = 'nahusenay_bookings';

const defaultPrices = {
    family: 5000,
    double: 4000,
    twin: 3000
};

document.addEventListener('DOMContentLoaded', () => {
    loadPrices();
});

/* PRICING LOGIC */
function loadPrices() {
    const savedPrices = JSON.parse(localStorage.getItem(PRICING_KEY)) || defaultPrices;
    
    const fam = document.getElementById('price-family');
    const dbl = document.getElementById('price-double');
    const twn = document.getElementById('price-twin');

    if(fam) fam.innerText = `ETB ${Number(savedPrices.family).toLocaleString()} / Night`;
    if(dbl) dbl.innerText = `ETB ${Number(savedPrices.double).toLocaleString()} / Night`;
    if(twn) twn.innerText = `ETB ${Number(savedPrices.twin).toLocaleString()} / Night`;

    const ef = document.getElementById('edit-family');
    const ed = document.getElementById('edit-double');
    const et = document.getElementById('edit-twin');

    if(ef) ef.value = savedPrices.family;
    if(ed) ed.value = savedPrices.double;
    if(et) et.value = savedPrices.twin;
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

/* BOOKING MODAL LOGIC */
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
    if (modal) {
        modal.style.display = 'none';
    }
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

    const currentBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    currentBookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(currentBookings));

    alert(`Thank you, ${booking.name}! Your reservation request for ${booking.room} has been received.`);
    
    document.getElementById('bookingForm').reset();
    closeBookingModal();
}

/* ADMIN PANEL LOGIC */
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

window.onclick = function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const adminModal = document.getElementById('adminModal');
    if (event.target === bookingModal) closeBookingModal();
    if (event.target === adminModal) closeAdminModal();
};
