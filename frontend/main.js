function updateList() {
    const titles = [...document.querySelectorAll('h1,h2')].sort((a, b) => {
        return Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top)
    });
    console.log(titles);
    document.querySelectorAll(".selected-circle").forEach(c => c.classList.remove("selected-circle"))
    document.querySelectorAll(".nav-dot")[[...document.querySelectorAll('h1,h2')].indexOf(titles[0])].classList.add("selected-circle");
}

updateList();
window.addEventListener('scroll', () => {
    updateList();
})

window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
})

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const functionApiUrl = isLocal ? 
    'http://localhost:7071/api/GetCounter' : 
    'https://cloudresumemmm-fa-f4fggugffnefcqec.eastus-01.azurewebsites.net/api/GetCounter';
const getVisitCount = async () => {
    try {
        const response = await fetch(functionApiUrl);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("counter").innerText = data.count;
        return data.count;
    } catch (error) {
        document.getElementById("counter").innerText = "—"; // graceful fallback
        return null;
    }
}

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // stops the native POST + redirect

  const data = Object.fromEntries(new FormData(form));
  status.textContent = 'Sending...';

  try {
    const res = await fetch('https://splitforms.com/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      status.textContent = 'Thanks — your message was sent!';
      form.reset();
    } else {
      const err = await res.json().catch(() => ({}));
      status.textContent = err.message || 'Something went wrong. Please try again.';
    }
  } catch (err) {
    status.textContent = 'Network error — please try again.';
  }
});