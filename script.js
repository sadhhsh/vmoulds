console.log("hello")

function toggleMobileMenu() {
        var menu = document.getElementById("mobileDropdown");
        if (menu.style.display === "flex") {
            menu.style.display = "none";
        } else {
            menu.style.display = "flex";
        }
    }