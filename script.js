console.log("hello")

function toggleMobileMenu() {
        var menu = document.getElementById("mobileDropdown");
        if (menu.style.display === "flex") {
            menu.style.display = "none";
        } else {
            menu.style.display = "flex";
        }
}

function sendHybridMessage(event) {
    event.preventDefault(); // Stop page reload

    // 1. Get Values
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var submitBtn = document.getElementById("submitBtn");

    // 2. Sanitize (Security)
    name = name.replace(/[<>]/g, "");
    message = message.replace(/[<>]/g, "");

    // 3. User Feedback (Change button text so they know it's working)
    var originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    // --- ACTION A: SEND EMAIL (Background) ---
    // We use FormSubmit's AJAX endpoint
    fetch("https://formsubmit.co/ajax/cccbaf084094d6fd0d9e0f3d3992532ef", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            email: email, // This is the customer's email
            message: message,
            _cc: "some@gmail.com", // Sending copy to your other email
            _subject: "New Website Inquiry" // Clean subject line
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Email sent successfully!");
    })
    .catch(error => {
        console.log("Email failed, but proceeding to WhatsApp:", error);
    });

    // --- ACTION B: OPEN WHATSAPP (Immediate) ---
    // We don't wait for the email to finish; we open WA immediately for speed.
    
    var whatsappText = 
        "*New Inquiry via Website*" + "%0a" +
        "-------------------------" + "%0a" +
        "*Name:* " + name + "%0a" +
        "*Phone:* " + phone + "%0a" +
        "*Email:* " + email + "%0a" +
        "-------------------------" + "%0a" +
        "*Message:* " + message;

    var myNumber = "91987654321"; 
    var waUrl = "https://wa.me/" + myNumber + "?text=" + whatsappText;

    // Small delay to let the user see "Sending..."
    setTimeout(function() {
        window.open(waUrl, '_blank').focus();
        
        // Reset form and button
        document.getElementById("contactForm").reset();
        submitBtn.innerHTML = "Message Sent!";
        submitBtn.style.background = "#3BBC8C"; // Change to Green to show success
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = ""; // Reset color
        }, 3000);
    }, 1000);
}