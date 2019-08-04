// Variables
let button = document.querySelector(".button");
let closeForm = document.querySelector(".close_button");

let form = document.querySelector(".apply_to_doctor");
let transparentBlock = document.querySelector(".transparent_block");
let select = document.getElementById('select');
let requestButton = document.querySelector(".btn-creat-request");
let inputs = document.querySelectorAll(".input-form");
let board = document.querySelector(".board");
let visitsArray = [];
let visitTherapist;
let visitCardiologist;
let visitDentist;
let newCard;

loadVisitsArrayFromLocalStr();

////// C L A S S E S /////////
class Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, comment) {
        this._idUser = `${name}${surname}`;
        this._doc = doctor;
        this._userName = name;
        this._userSurname = surname;
        this._userPatronymic = patronymic;
        this._currentDate = dateOfVisit;
        this._target = purpose;
        this._comment = comment;
    }

    static loadFromLocalStInStart () {
        if (visitsArray.length) {
            notFoundSpan_Hide();
            visitsArray.forEach((visitsArrayObj) => {
                const {_doc: doctor, _userSurname: surname, _userName: name, _userPatronymic: patronymic, _visit: purpose, _age: age, _pressure: pressure, _indexMass: bmi, _currentDate: dateOfVisit, _disease: diseasesCS, _lastVisit: lastVisit,  _comments: comment = ''} = visitsArrayObj;
                switch (doctor) {
                    case "Therapist":
                        visitTherapist = new Therapist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,age);
                        visitTherapist.createCard();
                        break;
                    case "Cardiologist":
                        visitCardiologist = new Cardiologist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,pressure, bmi, diseasesCS, age);
                        visitCardiologist.createCard();
                        break;
                    case "Dentist":
                        visitDentist = new Dentist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,lastVisit);
                        visitDentist.createCard();
                        break;
                }

            })
        }
    }

    createCard() {
        newCard = document.createElement("div");
        board.appendChild(newCard);
        newCard.classList.add("card");

        let closeCard = document.createElement("div");
        newCard.appendChild(closeCard);
        closeCard.innerHTML = ("<i class=\"fas fa-times\"></i>");
        closeCard.classList.add("close_card");

        newCard.setAttribute("data-doc", this._doc);
        newCard.setAttribute("data-id", `${this._userName}${this._userSurname}`);
        createElemInCard(newCard, `Doctor: ${this._doc}`);
        createElemInCard(newCard, `Name: ${this._userName}`);
        createElemInCard(newCard, `Surname: ${this._userSurname}`);
        let showMoreButton = document.createElement("p");
        showMoreButton.innerText = "SHOW MORE";
        showMoreButton.classList.add("showMoreButton");
        newCard.appendChild(showMoreButton);
    }
}

class Therapist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,age) {
        super (doctor, name, surname, patronymic, dateOfVisit, purpose, comment,);
        this._userAge = age;
    }
    showMore(target) {
        visitsArray.forEach((visitsArrayObj) => {
            if (target.parentElement.getAttribute("data-id") === visitsArrayObj._idUser) {
                let parentDiv = target.parentElement;
                createHiddenElemInCard(parentDiv, `Patronymic: ${visitsArrayObj._userPatronymic}`);
                createHiddenElemInCard(parentDiv, `Date of Birth: ${visitsArrayObj._userAge}`);
                createHiddenElemInCard(parentDiv, `Date of visit: ${visitsArrayObj._currentDate}`);
                createHiddenElemInCard(parentDiv, `Purpose of the visit: ${visitsArrayObj._target}`);
                createHiddenElemInCard(parentDiv, `Wishes: ${visitsArrayObj._comment}`);
                let hideTextButton = document.createElement("p");
                hideTextButton.innerText = "Hide";
                hideTextButton.classList.add("hideTextButton");
                parentDiv.appendChild(hideTextButton);
            }
        })
    }
}

class Cardiologist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,pressure, bmi, diseasesCS, age) {
        super (doctor, name, surname, patronymic, dateOfVisit, purpose, comment);
        this._userPressure = pressure;
        this._userBMI = bmi;
        this._userDiseasesCS = diseasesCS;
        this._age = age;
    }
    showMore(target) {
        visitsArray.forEach((visitsArrayObj) => {
            if (target.parentElement.getAttribute("data-id") === visitsArrayObj._idUser) {
                let parentDiv = target.parentElement;

                createHiddenElemInCard(parentDiv, `Patronymic: ${visitsArrayObj._userPatronymic}`);
                createHiddenElemInCard(parentDiv, `Date of Birth: ${visitsArrayObj._age}`);
                createHiddenElemInCard(parentDiv, `Date of visit: ${visitsArrayObj._currentDate}`);
                createHiddenElemInCard(parentDiv, `Purpose of the visit: ${visitsArrayObj._target}`);
                createHiddenElemInCard(parentDiv, `Normal pressure: ${visitsArrayObj._userPressure}`);
                createHiddenElemInCard(parentDiv, `Body mass index: ${visitsArrayObj._userBMI}`);
                createHiddenElemInCard(parentDiv, `Past illnesses: ${visitsArrayObj._userDiseasesCS}`);
                createHiddenElemInCard(parentDiv, `Wishes: ${visitsArrayObj._comment}`);
                let hideTextButton = document.createElement("p");
                hideTextButton.innerText = "Hide";
                hideTextButton.classList.add("hideTextButton");
                parentDiv.appendChild(hideTextButton);
            }
        })
    }
}

class Dentist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,lastVisit) {
        super(doctor, name, surname, patronymic, dateOfVisit, purpose, comment);
        this._lastvis = lastVisit;
    }
    showMore(target) {
        visitsArray.forEach((visitsArrayObj) => {
            if (target.parentElement.getAttribute("data-id") === visitsArrayObj._idUser) {
                let parentDiv = target.parentElement;
                createHiddenElemInCard(parentDiv, `Patronymic: ${visitsArrayObj._userPatronymic}`);
                createHiddenElemInCard(parentDiv, `Date of visit: ${visitsArrayObj._currentDate}`);
                createHiddenElemInCard(parentDiv, `Date Last Visited: ${visitsArrayObj._target}`);
                createHiddenElemInCard(parentDiv, `Purpose of the visit: ${visitsArrayObj._lastvis}`);
                createHiddenElemInCard(parentDiv, `Wishes: ${visitsArrayObj._comment}`);
                let hideTextButton = document.createElement("p");
                hideTextButton.innerText = "Hide";
                hideTextButton.classList.add("hideTextButton");
                parentDiv.appendChild(hideTextButton);
            }
        })
    }
}

Visit.loadFromLocalStInStart();

// Запрос на появление формы для создания карточки
button.onclick = function () {
    inputs.forEach(function (form) {
        form.value = "";
    });
    select.value = "select_doctor";
    document.querySelector(".container-for-form").classList.remove("active");
    transparentBlock.classList.add("active");
    form.classList.add("active");
};

// Закрытия формы с обнулением инпутов
closeForm.onclick = function() {
    closeTheForm();
    transparentBlock.classList.remove("active");
};
transparentBlock.onclick = function (event) {
    let currentTarget = event.target;
    if (currentTarget.classList.contains("transparent_block")) {
        closeTheForm();
        transparentBlock.classList.remove("active");
    }
};

//Tabs с select
select.onchange = function () {
    if (this.value === "therapist")  {
        removeActiveOfFormRequest();
        document.querySelector(".container-for-form").classList.add("active");
        document.querySelector(".form-therapist").classList.add("active");
    } else if (this.value === "cardiologist") {
        removeActiveOfFormRequest();
        document.querySelector(".container-for-form").classList.add("active");
        document.querySelector(".form-cardiologist").classList.add("active");
    } else if (this.value === "dentist") {
        removeActiveOfFormRequest();
        document.querySelector(".container-for-form").classList.add("active");
        document.querySelector(".form-dentist").classList.add("active");
    } else {
        removeActiveOfFormRequest();
        document.querySelector(".container-for-form").classList.remove("active");
    }
};



// Создание карточки на доске
requestButton.onclick = function () {
    if (select.value === "therapist") {
        let doctor = "Therapist";
        let name = document.querySelector(".name-therapist").value;
        let surname = document.querySelector(".surname-therapist").value;
        let patronymic = document.querySelector(".patronymic-therapist").value;
        let dateOfVisit = document.querySelector(".date-therapist").value;
        let purpose = document.querySelector(".purpose-therapist").value;
        let comment = document.querySelector(".comments-therapist").value;
        let age = document.querySelector(".age-therapist").value;
        if (name && surname && patronymic && dateOfVisit && purpose && age !== false) {
            notFoundSpan_Hide();
            visitTherapist = new Therapist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,age);
            visitsArray.push(visitTherapist);
            visitTherapist.createCard();
            writeVisitsArrayInLocalStr();

        } else {
            alert("To create a card, fill in all the fields!");
        }
    } else if (select.value === "cardiologist") {
        let doctor = "Cardiologist";
        let name = document.querySelector(".name-cardiologist").value;
        let surname = document.querySelector(".surname-cardiologist").value;
        let patronymic = document.querySelector(".patronymic-cardiologist").value;
        let dateOfVisit = document.querySelector(".date-cardiologist").value;
        let purpose = document.querySelector(".purpose-cardiologist").value;
        let comment = document.querySelector(".comments-cardiologist").value;
        let pressure = document.querySelector(".pressure-cardiologist").value;
        let bmi  = document.querySelector(".bmi-cardiologist").value;
        let diseasesCS = document.querySelector(".diseasesCS-cardiologist").value;
        let age = document.querySelector(".age-cardiologist").value;
        if (doctor && name && surname && patronymic && dateOfVisit && purpose && pressure && bmi && diseasesCS && age !== false) {
            notFoundSpan_Hide();
            visitCardiologist = new Cardiologist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,pressure, bmi, diseasesCS, age);
            visitsArray.push(visitCardiologist);
            visitCardiologist.createCard();
            writeVisitsArrayInLocalStr()

        } else {
            alert("To create a card, fill in all the fields!");
        }
    } else if (select.value === "dentist") {
        let doctor = "Dentist";
        let name = document.querySelector(".name-dentist").value;
        let surname = document.querySelector(".surname-dentist").value;
        let patronymic = document.querySelector(".patronymic-dentist").value;
        let dateOfVisit = document.querySelector(".date-dentist").value;
        let purpose = document.querySelector(".purpose-dentist").value;
        let comment = document.querySelector(".comments-dentist").value;
        let lastVisit = document.querySelector(".lastVisit-dentist").value;
        if (doctor && name && surname && patronymic && dateOfVisit && purpose && lastVisit !== false) {
            notFoundSpan_Hide();
            visitDentist = new Dentist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,lastVisit);
            visitsArray.push(visitDentist);
            visitDentist.createCard();
            writeVisitsArrayInLocalStr();

        } else {
            alert("To create a card, fill in all the fields!");
        }
    }
    form.classList.remove("active");
    transparentBlock.classList.remove("active");
    console.log(visitsArray);
};

// Интерактивные элементы доски
board.onclick = function ({target}) {
    if (target.className === "showMoreButton") {
        target.style.display = "none";
        switch (target.parentElement.getAttribute("data-doc")) {
            case "Therapist":
                visitTherapist.showMore(target);
                break;
            case "Cardiologist":
                visitCardiologist.showMore(target);
                break;
            case "Dentist":
                visitDentist.showMore(target);
                break;
        }
    } else if (target.className === "hideTextButton") {
        target.style.display = "none";
        target.parentElement.querySelectorAll(".hidden_element").forEach((elem) => {
            elem.remove();
            target.parentElement.querySelector(".showMoreButton").style.display = "block"
        })

    }
};

// Удаление карточки с доски
board.addEventListener("click", function ({target}) {
    const parent = target.parentElement;
    if (target.tagName === "I") {
        visitsArray.forEach(function (elem) {
            if (elem._idUser === parent.parentElement.getAttribute("data-id")) {
                let index = visitsArray.indexOf(elem);
                visitsArray.splice(index, 1);
                writeVisitsArrayInLocalStr();
            }
        });
        parent.parentElement.remove();
    }
});


/////// F U N C T I O N S /////////
function removeActiveOfFormRequest() {
    Array.from(document.getElementsByClassName("form-request")).forEach(function (elem) {
        elem.classList.remove("active")
    });
}

function notFoundSpan_Hide() {
    document.querySelector(".not-found").classList.remove("active");
}

function createElemInCard (card, innerText) {
    let paragraph = document.createElement("p");
    paragraph.innerText = innerText;
    card.appendChild(paragraph);
}

function createHiddenElemInCard(card, innerText) {
    let paragraph = document.createElement("p");
    paragraph.innerText = innerText;
    paragraph.classList.add("hidden_element");
    card.appendChild(paragraph);
}

function closeTheForm() {
    inputs.forEach(function (form) {
        form.value = "";
    });
    select.value = "select_doctor";
    form.classList.remove("active");
}

function writeVisitsArrayInLocalStr() {
    let serialArr = JSON.stringify(visitsArray);
    localStorage.setItem("ArrayOfCards", serialArr);
}

function loadVisitsArrayFromLocalStr() {
    if (localStorage.ArrayOfCards) {
        visitsArray = JSON.parse(localStorage.getItem("ArrayOfCards"));
    }
}





