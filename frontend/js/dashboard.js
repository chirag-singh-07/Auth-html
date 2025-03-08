document.addEventListener("DOMContentLoaded", async () => {
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const logoutBtn = document.getElementById("logout-btn");

  const token = localStorage.getItem("token");
  if (!token) {
    logoutBtn.style.display = "none";
    alert("You are not logged in. Redirecting to login page...");
    window.location.href = "login.html";
    return;
  }

  console.log("Token:", token);

  try {
    const res = await fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Data:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch user data.");
    }

    userName.textContent = data.name;
    userEmail.textContent = data.email;
  } catch (error) {
    console.error("Dashboard Error:", error);

    if (error.message.includes("Token expired")) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    } else {
      alert("Something went wrong. Please try again later.");
    }
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});
