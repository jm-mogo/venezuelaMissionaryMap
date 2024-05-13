const CARD = document.getElementById("card");
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
            if (!state.multiChurchState) {
                createChurchCard(state);
            } else {
                createMultiChurchCard(state);
            }
            MODAL.style.display = "block";
        }
    });
}

function printPoints(states) {
    let map = document.getElementById("map");
    for (let i = 0; i <= states.length - 1; i++) {
        let point = document.createElement("div");
        point.className = "state";
        point.id = states[i].id;
        point.addEventListener("click", clickPoint);
        map.appendChild(point);
    }
}

function createChurchCard(church, backId) {
    CARD.innerHTML = "";
    CARD.append(createCloseBtn(backId));
    CARD.append(createTitle(church.name));
    CARD.append(createLocationSection(church.location, church.locationUrl));
    CARD.append(createFamilyImg(church.img));
    CARD.append(createFamilyName(church.family));
    CARD.append(createSocialMediaSection(church.socials));
}

function createMultiChurchCard(state) {
    CARD.innerHTML = "";
    CARD.append(createCloseBtn());
    CARD.append(createTitle(state.name));
    for (let i = 0; i <= state.churches.length - 1; i++) {
        CARD.append(createChurchBox(state.churches[i], state.id));
    }
}

function createSocialMediaSection(socials) {
    if (!socials) {
        return "";
    }
    const socialsSection = document.createElement("div");
    socialsSection.classList = "socialSection";

    socials.forEach((social) => {
        const socialMedia = document.createElement("div");
        socialMedia.classList = `socialMedia ${social.name}`;

        const link = document.createElement("a");
        link.setAttribute("href", social.socialUrl);
        link.setAttribute("target", "_blank");

        link.append(socialMedia);
        socialsSection.append(link);
    });

    return socialsSection;
}

function createChurchBox(church, backId) {
    const churchBox = document.createElement("div");
    churchBox.classList = "churchBox";

    const churchText = document.createElement("p");
    churchText.textContent = church.location;

    churchBox.append(churchText);
    churchBox.addEventListener("click", () => {
        createChurchCard(church, backId);
    });

    return churchBox;
}

function createBackBtn(id) {
    const back = document.createElement("div");
    back.textContent = "◀";
    back.classList = "backBtn";
    back.addEventListener("click", () => {
        console.log(id);
        for (let i = 0; i <= STATES.length - 1; i++) {
            if (STATES[i].id == id) {
                createMultiChurchCard(STATES[i]);
            }
        }
    });

    return back;
}

function createCloseBtn(backId) {
    btnsContainer = document.createElement("div");
    if (backId) {
        btnsContainer.append(createBackBtn(backId));
    }
    const span = document.createElement("span");
    span.addEventListener("click", closeModal);
    span.classList = "close";
    span.innerHTML = "&times;";

    btnsContainer.append(span);
    btnsContainer.classList = "closeAndBackBtn";

    return btnsContainer;
}

function createTitle(churchName) {
    const p = document.createElement("p");
    p.classList = "churchName";
    p.textContent = churchName;
    return p;
}

function createLocationSection(location, locationUrl) {
    const locationSection = document.createElement("div");
    locationSection.classList = "location";

    const locationLink = document.createElement("a");
    if (locationUrl) {
        locationLink.setAttribute("href", locationUrl);
        locationLink.setAttribute("target", "_black");
    }

    const mapIcon = document.createElement("span");
    mapIcon.classList = "locationIcon";
    locationLink.append(mapIcon);

    const locationName = document.createElement("p");
    locationName.textContent = location;

    locationSection.append(locationLink);
    locationSection.append(locationName);

    return locationSection;
}

function createFamilyImg(imgURL) {
    const img = document.createElement("img");
    img.setAttribute("src", imgURL);
    img.classList = "family-picture";
    return img;
}

function createFamilyName(familyName) {
    const p = document.createElement("p");
    p.textContent = `Family: ${familyName}`;
    return p;
}

function closeModal() {
    MODAL.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == MODAL) {
        MODAL.style.display = "none";
    }
};
