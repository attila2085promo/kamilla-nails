const serviceSelect = document.getElementById("serviceSelect");
const dateSelect = document.getElementById("dateSelect");
const timeSlotsDiv = document.getElementById("timeSlots");
const bookBtn = document.getElementById("bookBtn");
const bookingMessage = document.getElementById("bookingMessage");

const clientName = document.getElementById("clientName");
const clientEmail = document.getElementById("clientEmail");
const clientPhone = document.getElementById("clientPhone");

let selectedTime = null;

// Időpontok generálása
function generateTimeSlots() {
  timeSlotsDiv.innerHTML = "";
  selectedTime = null;

  const duration = parseInt(serviceSelect.value);
  if (!duration || !dateSelect.value) return;

  const startHour = 8;
  const endHour = 18;

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  for (let hour = startHour; hour < endHour; hour++) {
    const time = `${hour}:00`;

    const slot = document.createElement("div");
    slot.classList.add("time-slot");
    slot.textContent = time;

    // Ellenőrizzük, hogy ez az időpont foglalt-e
    const isBooked = bookings.some(b => {
      if (b.date !== dateSelect.value) return false;

      const bookingStart = parseInt(b.time);
      const bookingEnd = bookingStart + b.duration / 60;

      return hour >= bookingStart && hour < bookingEnd;
    });

    if (isBooked) {
      slot.classList.add("booked");
      slot.style.background = "#ccc";
      slot.style.cursor = "not-allowed";
    } else {
      slot.addEventListener("click", () => {
        document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
        slot.classList.add("selected");
        selectedTime = time;
      });
    }

    timeSlotsDiv.appendChild(slot);
  }
}

serviceSelect.addEventListener("change", generateTimeSlots);
dateSelect.addEventListener("change", generateTimeSlots);

// Foglalás
bookBtn.addEventListener("click", () => {
  const name = clientName.value.trim();
  const email = clientEmail.value.trim();
  const phone = clientPhone.value.trim();

  // Ellenőrzés: minden kötelező mező ki van-e töltve
  if (!serviceSelect.value || !dateSelect.value || !selectedTime) {
    bookingMessage.textContent = "Kérlek válassz szolgáltatást, dátumot és időpontot!";
    bookingMessage.style.color = "red";
    return;
  }

  if (name.length < 3) {
    bookingMessage.textContent = "Kérlek adj meg egy érvényes nevet!";
    bookingMessage.style.color = "red";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    bookingMessage.textContent = "Kérlek adj meg egy érvényes email címet!";
    bookingMessage.style.color = "red";
    return;
  }

  const booking = {
    duration: parseInt(serviceSelect.value),
    date: dateSelect.value,
    time: selectedTime,
    name: name,
    email: email,
    phone: phone
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  bookingMessage.textContent = "Foglalás sikeres!";
  bookingMessage.style.color = "green";

  generateTimeSlots();
});
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});
