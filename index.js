const CART = document.getElementById("cart");
const MODAL = document.getElementById("modal");
let CLOSE = document.getElementsByClassName("close")[0];

let STATES = [];
fetch("./states.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        STATES = data;
        printPoints(STATES);
    })
    .catch(function (error) {
        console.log("An error occurred:", error);
    });

function clickPoint(e) {
    STATES.forEach((state) => {
        if (state.id == e.target.id) {
            createCart(state);
            MODAL.style.display = "block";
        }
    });
}

function printPoints(states) {
    let map = document.getElementById("map");
    for (let i = 0; i < states.length; i++) {
        let point = document.createElement("div");
        point.className = "state";
        point.id = states[i].id;
        point.addEventListener("click", clickPoint);
        map.appendChild(point);
    }
}

function createCart(church) {
    CART.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <p class="churchName">${church.name}</p>
        <div class="location"> 
        <span class="locationIcon"></span>
        <p> ${church.location}</p>
        </div>
        
        <img src="${church.img}" alt="family" class="family-picture">
        <p>Family: ${church.family}</p>
    `;
}

function closeModal() {
    MODAL.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
