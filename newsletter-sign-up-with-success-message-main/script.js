const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = form.querySelector("#email");
  if (!isValidEmail(email.value)) {
    const errorMessage = form.querySelector(".form__error-message");
    errorMessage.classList.add("error");
    email.classList.add("error");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });

    if (response.ok) {
      const data = await response.text();
      console.log("Email added successfully:", data);
    } else {
      console.error("Error adding email:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred while adding email:", error);
  }
});

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
