async function loadData() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("JSON load error:", error);
    }
}

async function searchRecommendations() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (!input) {
        results.innerHTML = "<p>Please enter a keyword.</p>";
        return;
    }

    const data = await loadData();
    let matches = [];

    if (input.includes("beach")) {
        matches = data.beaches;
    } else if (input.includes("temple")) {
        matches = data.temples;
    } else {
        const country = data.countries.find(c => c.name.toLowerCase() === input);
        if (country) matches = country.cities;
    }

    if (matches.length === 0) {
        results.innerHTML = "<p>No results found.</p>";
        return;
    }

    matches.forEach(place => {
        results.innerHTML += `
            <div class="card">
                <img src="${place.imageUrl}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            </div>
        `;
    });
}

function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}
