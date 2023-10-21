document.addEventListener("DOMContentLoaded", function() {
    // Get the modal and buttons to open it
    const enquiryModal = document.getElementById("enquiryModal");
    const openEnquiryButtons = document.querySelectorAll(".enquireBtn");
    const closeBtn = document.querySelector(".close-btn");

    // Function to open the modal
    function openModal() {
        console.log("Modal opened");
        enquiryModal.style.display = "flex";
    }

    // Function to close the modal
    function closeModal() {
        console.log("Modal closed");
        enquiryModal.style.display = "none";
    }

    openEnquiryButtons.forEach(button => {
        button.addEventListener("click", openModal);
    });

    // Close the modal when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", function(event) {
        if (event.target == enquiryModal) {
            closeModal();
        }
    });
});
