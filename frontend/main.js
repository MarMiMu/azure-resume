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

const functionApiURL = 'https://getresumecountermmm.azurewebsites.net/api/GetResumeCounter?code=oKkjiR0q2Hu8GKzUlsShXtuoVY1ma9aotkQIt4ZXstBDAzFuwJhrEg==';
const functionApiLocal = 'http://localhost:7071/api/GetResumeCounter';
const getVisitCount = () => {
    let count = 30;
    fetch(functionApiURL).then(response => {
        return response.json()
    }).then(response => {
        console.log("Website called functionApi");
        count = response.count;
        document.getElementById("counter").innerText = count;
    }).catch(function (error) {
        console.log(error);
    });
    return count;

}