var container = document.querySelector(".container"),
    seats = document.querySelectorAll(".row .seat"),
    count = document.getElementById("count"),
    total = document.getElementById("total"),
    movieSelected = document.getElementById("movie");
populateUI()

// Update Number of Selected Seats and Total Price.
function updateCount() {
    selectedSeats = container.querySelectorAll(".row .seat.selected");
    count.textContent = selectedSeats.length;
    total.textContent = selectedSeats.length * movieSelected.value;
    seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

// Populate UI with Local Storage Data if exist.
function populateUI() {
    selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) != -1) {
                seat.classList.add("selected");
            }
        })
    }
    if (localStorage.getItem("selectedMovieIndex") !== null) {
        movieSelected.selectedIndex = localStorage.getItem("selectedMovieIndex");   
    }
};

// Update Total Price On Movie Change
movieSelected.addEventListener("change", function(e) {
    localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
    updateCount();
});

// Clicking on Seats Event
container.addEventListener("click", function(e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateCount();
    }
});
updateCount()