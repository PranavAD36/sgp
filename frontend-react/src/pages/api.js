const BASE_URL = "https://sgp-backend-obwi.onrender.com/api";

async function postData(url, data) {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

async function getData(url) {
  const res = await fetch(BASE_URL + url);
  return res.json();
}

// NEW FUNCTIONS
async function startLecture(data) {
  return postData("/lecture/start", data);
}

async function endLecture(data) {
  return postData("/lecture/end", data);
}

export { postData, getData, startLecture, endLecture };
