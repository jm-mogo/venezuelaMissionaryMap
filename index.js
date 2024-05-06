const CART = document.getElementById("cart");
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
                console.log(state);
                createCart(state);
            }
        });
        console.log(e.target.id);
    });
}

console.log();

function createCart(state) {
    CART.innerHTML = `
        <p>Location: ${state.location}</p>
        <p>Family: Mogollon</p>
        <p>Founded: long ago</p>
        <img src="${state.img}" alt="" class="family-picture">
    `;
}
