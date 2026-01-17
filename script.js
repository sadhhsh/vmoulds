console.log("hello")

function toggleMobileMenu() {
        var menu = document.getElementById("mobileDropdown");
        if (menu.style.display === "flex") {
            menu.style.display = "none";
        } else {
            menu.style.display = "flex";
        }
}

function sendToWhatsapp(event) {
        // 1. Stop the page from refreshing
        event.preventDefault();

        // 2. Get the values
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;

        // 3. SECURITY: "Sanitization" (The Anti-Hack Layer)
        // This removes < and > characters so nobody can inject code scripts
        name = name.replace(/[<>]/g, "");
        message = message.replace(/[<>]/g, "");

        // 4. Construct the Final Message
        // %0a is code for "New Line"
        var whatsappText = 
            "*New Inquiry from Website*" + "%0a" +
            "-------------------------" + "%0a" +
            "*Name:* " + name + "%0a" +
            "*Phone:* " + phone + "%0a" +
            "*Email:* " + email + "%0a" +
            "-------------------------" + "%0a" +
            "*Message:* " + message;

        // 5. Your Business Number (Format: CountryCode + Number, no spaces)
        // EXAMPLE: 919876543210
        var myPhoneNumber = "917046263431"; 

        // 6. Create the WhatsApp Link
        var url = "https://wa.me/" + myPhoneNumber + "?text=" + whatsappText;

        // 7. Send! (Opens WhatsApp in new tab)
        window.open(url, '_blank').focus();
    }