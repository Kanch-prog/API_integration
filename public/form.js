document.addEventListener("DOMContentLoaded", function() {
    // Get the form and success message elements
    const form = document.getElementById("enquiryForm");
    const successMessage = document.getElementById("successMessage");

    // Form submission and success message handling
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Convert the form data to a JSON string
        const formDataJSON = JSON.stringify(formDataObject);

        // Use fetch or XMLHttpRequest to send the JSON data to your API
        fetch("/api/storeCustomerDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formDataJSON, // Send the JSON data
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("API request failed");
            }
        })
        .then(result => {
            // Assuming your API sends a success message in the response
            if (result && result.message) {
                const successMessageText = result.message;

                // Display the success message
                successMessage.innerText = successMessageText;
            }
        })
        .catch(error => {
            // Handle network errors and API request errors
            console.error(error);
        });
    });
});
