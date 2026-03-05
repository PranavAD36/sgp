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

  // extra cleanup
  localStorage.removeItem("studentId");
  localStorage.removeItem("facultyId");
  localStorage.removeItem("adminId");

  window.location.href = "index.html";
}

function openProfile() {
  const role = localStorage.getItem("role");
  if (role === "student") window.location.href = "studentProfile.html";
  else if (role === "faculty") window.location.href = "facultyProfile.html";
  else if (role === "admin") window.location.href = "adminProfile.html";
  else window.location.href = "index.html";
}

function goBack() {
  window.history.back();
}

// ✅ Auto set role/userId if missing (fix for faculty/admin)
function ensureLoginForRole(role) {
  let savedRole = localStorage.getItem("role");
  let userId = localStorage.getItem("userId");

  if (savedRole && userId) return { savedRole, userId };

  // fallback keys
  const fallbackId =
    (role === "student" && localStorage.getItem("studentId")) ||
    (role === "faculty" && localStorage.getItem("facultyId")) ||
    (role === "admin" && localStorage.getItem("adminId"));

  if (fallbackId) {
    localStorage.setItem("role", role);
    localStorage.setItem("userId", fallbackId);
    savedRole = role;
    userId = fallbackId;
  }

  return { savedRole, userId };
}

async function loadProfile(role) {
  try {
    setMsg("");

    const { savedRole, userId } = ensureLoginForRole(role);

    if (!userId || !savedRole) {
      setMsg("Pehla login kar.", true);
      return;
    }

    if (savedRole !== role) {
      setMsg("Wrong role profile open thayu.", true);
      return;
    }

    const url = `${BASE_URL}/profile/${role}/${userId}`;
    const res = await fetch(url);

    if (!res.ok) {
      const txt = await res.text();
      setMsg(`API Error: ${res.status} | ${txt}`, true);
      return;
    }

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

// ✅ expose
window.loadProfile = loadProfile;
window.logout = logout;
window.goBack = goBack;
window.openProfile = openProfile;