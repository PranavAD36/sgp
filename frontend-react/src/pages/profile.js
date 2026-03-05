// frontend/profile.js

const BASE_URL = "https://sgp-backend-obwi.onrender.com/api";

function setMsg(text, isError = false) {
  const el = document.getElementById("msg");
  if (!el) return;
  el.innerText = text || "";
  el.style.color = isError ? "red" : "green";
}

function logout() {
  localStorage.removeItem("role");
  localStorage.removeItem("userId");

  // extra safe cleanup (jo hoy to)
  localStorage.removeItem("studentId");
  localStorage.removeItem("facultyId");
  localStorage.removeItem("adminId");

  window.location.href = "index.html";
}

function goBack() {
  window.history.back();
}

async function loadProfile(role) {
  try {
    setMsg("");

    const userId = localStorage.getItem("userId");
    const savedRole = localStorage.getItem("role");

    if (!userId || !savedRole) {
      setMsg("Pehla login kar.", true);
      return;
    }

    if (savedRole !== role) {
      setMsg("Aa profile tamara mate nathi.", true);
      return;
    }

    const url = `${BASE_URL}/profile/${role}/${userId}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.message) {
      setMsg(data.message, true);
      return;
    }

    const p = data.profile || {};

    document.getElementById("id").innerText =
      p.studentId || p.facultyId || p.adminId || userId;

    document.getElementById("name").innerText = p.name || "-";
    document.getElementById("email").innerText = p.email || "-";
    document.getElementById("phone").innerText = p.phone || "-";
  } catch (err) {
    console.log(err);
    setMsg("Profile load error", true);
  }
}

// ✅ make functions available for HTML onclick
window.loadProfile = loadProfile;
window.logout = logout;
window.goBack = goBack;