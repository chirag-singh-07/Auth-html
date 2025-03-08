document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");

  if (!signupForm) {
    console.error("signup form not found!");
    return;
  }

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    const nameError = document.getElementById("signup-name-error");
    const emailError = document.getElementById("signup-email-error");
    const passwordError = document.getElementById("signup-password-error");

    let isValid = true;

    if (name === "") {
      nameError.innerText = "Please enter your name.";
      nameError.style.display = "block";
      isValid = false;
    } else {
      nameError.style.display = "none";
    }

    if (email === "") {
      emailError.innerText = "Please enter a valid email.";
      emailError.style.display = "block";
      isValid = false;
    } else {
      emailError.style.display = "none";
    }

    if (password === "") {
      passwordError.innerText = "Password cannot be empty.";
      passwordError.style.display = "block";
      isValid = false;
    } else if (password.length < 6) {
      passwordError.innerText = "Password must be at least 6 characters.";
      passwordError.style.display = "block";
      isValid = false;
    } else {
      passwordError.style.display = "none";
    }

    if (isValid) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Signup Falied0");
        }

        alert("Signup successful! You can now login.");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Signup Error:", error);
        alert(error.message);
      }
    }
  });
});
