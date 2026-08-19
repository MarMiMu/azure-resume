function updateList() {
    const titles = [...document.querySelectorAll('h1,h2')].sort((a, b) => {
        return Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top)
    });
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
    'https://getresumecountermmm.azurewebsites.net/api/GetResumeCounter?code=oKkjiR0q2Hu8GKzUlsShXtuoVY1ma9aotkQIt4ZXstBDAzFuwJhrEg==';
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