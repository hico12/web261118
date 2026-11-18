
function average(list) {
    let sum = 0;
    for (const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}
console.log("평균:", average(movies));

function best(list) {
    let top = list[0];

    for (let i = 1; i < list.length; i++) {
        if (list[i].rating > top.rating) {
            top = list[i];
        }
    }

    return top;
}


console.log("최고:", best(movies));



function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}



function sortByRating(list) {
    return [...list].sort((a, b) => b.rating - a.rating);
}


const board = document.querySelector(".board");
function renderCards(list){

if (list.length === 0) {
    board.classList.add("is-empty");
} else {
    board.classList.remove("is-empty");
}
board.innerHTML = list.map(m => `
  <article class="card">
    <img class="poster" src="https://image.tmdb.org/t/p/w500${m.poster}" alt="${m.title}">
    <span class="badge">${m.rating}</span>
    <button class="like">♥</button>
    <div class="info">
      <h2>${m.title}</h2>
      <p class="year">${m.year}</p>
    </div>
  </article>
`).join("");

}
renderCards(movies);



const qInput = document.querySelector("#q");
const sortSelect = document.querySelector("#sortBy");

function getView() {
    const kw = document.querySelector("#q").value.trim().toLowerCase();
    let result = movies.filter(m => m.title.toLowerCase().includes(kw));

    if (sortSelect.value === "rating") {
        result = sortByRating(result);
    } else if (sortSelect.value === "year") {
        result = [...result].sort((a, b) => b.year - a.year);
    } else if (sortSelect.value === "title") {
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
}

qInput.addEventListener("input", () => renderCards(getView()));
sortSelect.addEventListener("change", () => renderCards(getView()));

qInput.addEventListener("keydown", (e) => { if (e.key === "Escape") { qInput.value = ""; renderCards(getView()); } });


board.addEventListener("click", function (e) {
    if (e.target.classList.contains("like")) {
        e.target.classList.toggle("liked");
        document.querySelector("#likeCount").textContent = document.querySelectorAll(".like.liked").length;
    }
});

