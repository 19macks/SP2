let button = document.querySelector(".button");
let closeButton = document.querySelector(".close_button");
let form = document.querySelector(".apply_to_doctor");
let select = document.getElementById('select');
let requestButton = document.querySelector(".btn-creat-request");
let inputs = document.querySelectorAll(".input-form");
let board = document.querySelector(".board");
let cardiologistForms = document.querySelectorAll(".form-cardiologist");
let therapistForms = document.querySelectorAll(".form-therapist");
let dentistForm = document.querySelectorAll(".form-dentist");
let VisitsArray = [];

closeButton.onclick = function () {
    resetForm();
};

document.body.addEventListener("click", function (event) {
    let target = event.target;
    while (target.tagName !== 'BODY') {
        if (target === form) {
            form.classList.add("active");
            return;
        }
        else if (target === button) {
            if (form.classList.contains("active")) {
                form.classList.remove("active");
                return;
            } else {
                inputs.forEach(function (form) {
                    form.value = "";
                });
                select.value = "select_doctor";
                document.querySelector(".container-for-form").classList.remove("active");
                form.classList.add("active");
                return;
            }
        }
        else if (target === closeButton) {
            form.classList.remove("active");
            return;
        }
        else {
            form.classList.remove("active")
        }
        target = target.parentNode;
    }
});

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
        newCard.setAttribute("data-id", `${this._userName}${this._userSurname}`);
        createElemInCard(newCard, `Имя: ${this._userName}`);
        createElemInCard(newCard, `Фамилия: ${this._userSurname}`);
        createElemInCard(newCard, `Доктор: ${this._doc}`);
        // let spanName = document.createElement("p");
        //         // newCard.appendChild(spanName);
        //         // spanName.innerHTML = `Фамилия: ${this._userName}`;
        //         // let spanSurname = document.createElement("p");
        //         // newCard.appendChild(spanSurname);
        //         // spanName.innerHTML = `Имя: ${this._userName}`;
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
            VisitsArray.push(visitTherapist);
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
            let VisitCardiologist = new Cardiologist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,pressure, bmi, diseasesCS, age);
            VisitsArray.push(VisitCardiologist);

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
            let VisitDentist = new Dentist(doctor, name, surname, patronymic, dateOfVisit, purpose, comment ,lastVisit);

        } else {
            alert("Для создания карточки необходимо заполните все поля!");
        }
    }
};


/////// F U N C T I O N S /////////
function removeActiveOfFormRequest() {
    Array.from(document.getElementsByClassName("form-request")).forEach(function (elem) {
        elem.classList.remove("active")
    });
}

function resetForm() {
    inputs.forEach(function (form) {
        form.value = "";
    });
    select.value = "select_doctor";
    document.querySelector(".container-for-form").classList.remove("active");
}

function notFoundSpan_Hide() {
    document.querySelector(".not-found").classList.remove("active");
}

function createElemInCard (card, innerText) {
  let paragraph = document.createElement("p");
    paragraph.innerText = innerText;
  card.appendChild(paragraph)
}








