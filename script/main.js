let button = document.querySelector(".button");
let closeForm = document.querySelector(".close_button");
let closeCard = document.querySelector(".close_card");

let form = document.querySelector(".apply_to_doctor");
let transparentBlock = document.querySelector(".transparent_block");
let select = document.getElementById('select');
let requestButton = document.querySelector(".btn-creat-request");
let inputs = document.querySelectorAll(".input-form");
let board = document.querySelector(".board");
let visitsArray = [];

button.onclick = function () {
    inputs.forEach(function (form) {
        form.value = "";
    });
    select.value = "select_doctor";
    document.querySelector(".container-for-form").classList.remove("active");
    transparentBlock.classList.add("active");
    form.classList.add("active");
};
transparentBlock.onclick = function (event) {
    let currentTarget = event.target;
    if (currentTarget.classList.contains("transparent_block")) {
        closeTheForm();
        transparentBlock.classList.remove("active");
    }
};

closeForm.onclick = function() {
    closeTheForm();
    transparentBlock.classList.remove("active");
};

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


////// C L A S S E S /////////
class Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, comment) {
        this._doc = doctor;
        this._userName = name;
        this._userSurname = surname;
        this._userPatronymic = patronymic;
        this._currentDate = dateOfVisit;
        this._target = purpose;
        this._comment = comment;
    }
    createCard() {
        let newCard = document.createElement("div");
        board.appendChild(newCard);
        newCard.classList.add("card");

        let closeCard = document.createElement("div");
        newCard.appendChild(closeCard);
        closeCard.innerHTML = ("<i class=\"fas fa-times\"></i>");
        closeCard.classList.add("close_card");


        board.addEventListener("click", function (event) {
            let currentTarget = event.target;
            console.log(currentTarget.tagName);
            if (currentTarget.tagName === "I") {
                let targetParen =  currentTarget.parentElement;
                targetParen.parentElement.remove();
            }
        });

        newCard.setAttribute("data-id", `${this._userName}${this._userSurname}`);
        createElemInCard(newCard, `Имя: ${this._userName}`);
        createElemInCard(newCard, `Фамилия: ${this._userSurname}`);
        createElemInCard(newCard, `Доктор: ${this._doc}`);
        createHiddenElemInCard(newCard, `Отчество: ${this._userPatronymic}`);
        createHiddenElemInCard(newCard, `Дата: ${this._currentDate}`);
        createHiddenElemInCard(newCard, `Цель визита: ${this._target}`);
        createHiddenElemInCard(newCard, `Пожелания: ${this._comment}`);
    }
}

class Therapist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,age) {
        super (doctor, name, surname, patronymic, dateOfVisit, purpose, comment);
        this._userAge = age;
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
}

class Dentist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,lastVisit) {
        super(doctor, name, surname, patronymic, dateOfVisit, purpose, comment);
        this._lastvis = lastVisit;
    }
}

requestButton.onclick = function () {
    if (select.value === "therapist") {
        let doctor = "Терапевт";
        let name = document.querySelector(".name-therapist").value;
        let surname = document.querySelector(".surname-therapist").value;
        let patronymic = document.querySelector(".patronymic-therapist").value;
        let dateOfVisit = document.querySelector(".date-therapist").value;
        let purpose = document.querySelector(".purpose-therapist").value;
        let comment = document.querySelector(".comments-therapist").value;
        let age = document.querySelector(".age-therapist").value;
        if (name && surname && patronymic && dateOfVisit && purpose && age !== false) {
            notFoundSpan_Hide();
            let visitTherapist = new Therapist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,age);
            visitsArray.push(visitTherapist);
            visitTherapist.createCard();


        } else {
            alert("Для создания карточки необходимо заполните все поля!");
        }
    } else if (select.value === "cardiologist") {
        let doctor = "Кардиолог";
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
            let visitCardiologist = new Cardiologist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,pressure, bmi, diseasesCS, age);
            visitsArray.push(visitCardiologist);
            visitCardiologist.createCard()

        } else {
            alert("Для создания карточки необходимо заполните все поля!");
        }
    } else if (select.value === "dentist") {
        let doctor = "Стоматолог";
        let name = document.querySelector(".name-dentist").value;
        let surname = document.querySelector(".surname-dentist").value;
        let patronymic = document.querySelector(".patronymic-dentist").value;
        let dateOfVisit = document.querySelector(".date-dentist").value;
        let purpose = document.querySelector(".purpose-dentist").value;
        let comment = document.querySelector(".comments-dentist").value;
        let lastVisit = document.querySelector(".lastVisit-dentist").value;
        if (doctor && name && surname && patronymic && dateOfVisit && purpose && lastVisit !== false) {
            notFoundSpan_Hide();
            let visitDentist = new Dentist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,lastVisit);
            visitsArray.push(visitDentist);
            visitDentist.createCard()

        } else {
            alert("Для создания карточки необходимо заполните все поля!");
        }
    }
    form.classList.remove("active");
    transparentBlock.classList.remove("active");
};


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
    paragraph.classList.add("show_more");
    paragraph.innerText = innerText;
    card.appendChild(paragraph);
}

function closeTheForm() {
    inputs.forEach(function (form) {
        form.value = "";
    });
    select.value = "select_doctor";
    form.classList.remove("active");
}