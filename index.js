const CART = document.getElementById("cart");
const MODAL = document.getElementById("modal")
let CLOSE = document.getElementsByClassName("close")[0];


let STATES = [];
fetch("./states.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        STATES = data;
    })
    .catch(function (error) {
        console.log("An error occurred:", error);
    });

let states = document.getElementsByClassName("state");

for (let i = 0; i < states.length; i++) {
    states[i].addEventListener("click", (e) => {
        STATES.forEach((state) => {
            if (state.id == e.target.id) {
                createCart(state);
                MODAL.style.display = "block"
            }
        });
    });
}


function createCart(church) {
    CART.innerHTML = ""
    CART.innerHTML += `
        <span class="close" onclick="closeModal()">&times;</span>
        <p>${church.name}</p>
        <p>Location: ${church.location}</p>
        <img src="${church.img}" alt="family" class="family-picture">
        <p>Family: ${church.family}</p>
    `;
}

function closeModal() {
    MODAL.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 