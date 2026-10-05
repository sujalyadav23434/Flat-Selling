// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL =
    "https://aqwvejjdfbymvirwrskt.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_yq2MqLO5qDlZnZXrD5-h-g_eOU55W-x";


const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ==========================================
// GET FORM ELEMENTS
// ==========================================

const inquiryForm =
    document.getElementById("inquiryForm");

const submitBtn =
    document.getElementById("submitBtn");

const formMessage =
    document.getElementById("formMessage");


// ==========================================
// FORM SUBMIT
// ==========================================

inquiryForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    console.log("Form submitted");


    // Get form values

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const propertyType =
        document.getElementById("property_type").value;

    const message =
        document.getElementById("message").value.trim();


    console.log({
        name,
        email,
        phone,
        propertyType,
        message
    });


    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !email || !phone || !propertyType) {

        formMessage.textContent =
            "Please fill all required fields.";

        formMessage.style.color = "red";

        return;
    }


    // ==========================================
    // BUTTON
    // ==========================================

    submitBtn.disabled = true;

    submitBtn.textContent = "Submitting...";


    try {

        console.log("Sending data to Supabase...");


        // ======================================
        // INSERT DATA
        // ======================================

        const { data, error } = await supabaseClient
            .from("inquiries")
            .insert([{
                name: name,
                email: email,
                phone: phone,
                property_type: propertyType,
                message: message
            }]);

        if (error) {
            console.error("SUPABASE ERROR:", error);
            formMessage.textContent = error.message;
            formMessage.style.color = "red";
            return;
        }


        // ======================================
        // SUPABASE ERROR
        // ======================================

        if (error) {

            console.error(
                "SUPABASE ERROR:",
                error
            );

            console.error(
                "Error message:",
                error.message
            );

            console.error(
                "Error details:",
                error.details
            );

            console.error(
                "Error hint:",
                error.hint
            );

            formMessage.textContent =
                error.message;

            formMessage.style.color = "red";

            return;
        }


        // ======================================
        // SUCCESS
        // ======================================

        console.log(
            "SUCCESS:",
            data
        );


        formMessage.textContent =
            "Thank you! Your inquiry has been submitted successfully.";

        formMessage.style.color = "green";


        // Clear form

        inquiryForm.reset();


    } catch (error) {

        console.error(
            "JAVASCRIPT ERROR:",
            error
        );

        formMessage.textContent =
            "Error: " + error.message;

        formMessage.style.color = "red";


    } finally {

        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit Inquiry";

    }

});