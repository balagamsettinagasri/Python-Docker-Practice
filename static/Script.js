async function bookTicket() {
    // Get values from form fields
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const busType = document.getElementById("busType").value;
    const passengers = document.getElementById("passengers").value;

    // Basic validation
    if (!from || !to || !date || !passengers) {
        alert("Please fill all fields!");
        return;
    }

    if (from.toLowerCase() === to.toLowerCase()) {
        alert("Departure and destination cannot be the same!");
        return;
    }

    try {
        // Send booking data to Flask backend
        const response = await fetch("/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: from,
                to: to,
                date: date,
                busType: busType,
                passengers: passengers
            })
        });

        // Convert response to JSON
        const result = await response.json();

        // Show confirmation
        document.getElementById("details").innerHTML = `
            <strong>${result.message}</strong><br><br>
            From: ${result.from} <br>
            To: ${result.to} <br>
            Journey Date: ${result.date} <br>
            Passengers: ${result.passengers} <br>
            Total Price: ₹${result.total}
        `;
    } catch (error) {
        // Error handling
        alert("Booking failed! Please try again.");
        console.error("Error:", error);
    }
}