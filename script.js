// Function to sanitize input by removing special characters
function sanitizeInput(input) {
  return input.replace(/[;:,"]/g, "");
}

// Adding event listener to form submission
document
  .getElementById("wifi-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from submitting and reloading the page

    // Get and sanitize inputs
    var ssid = sanitizeInput(document.getElementById("ssid").value);
    var password = sanitizeInput(document.getElementById("password").value);
    var encryption = document.getElementById("encryption").value;

    // Validate inputs
    if (!ssid) {
      alert("Please enter a WiFi Network Name (SSID)");
      return;
    }

    if (encryption !== "nopass" && !password) {
      alert("Please enter a password for the selected encryption type");
      return;
    }

    // Set encryption type to 'nopass' if no password is required
    var encryptionType = encryption === "nopass" ? "nopass" : encryption;

    // Construct QR code data string
    var qrText = `WIFI:S:${ssid};T:${encryptionType};P:${password};H:;;`;

    // Clear any existing QR code
    document.getElementById("qrcode").innerHTML = "";

    // Generate QR code in the div
    try {
      new QRCode(document.getElementById("qrcode"), {
        text: qrText,
        width: 200,
        height: 200,
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("There was an error generating the QR code. Please try again.");
    }
  });

// Get the theme switch element
const themeSwitch = document.getElementById("theme-switch");

// Add an event listener to the theme switch
themeSwitch.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});
