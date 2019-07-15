let button = document.querySelector(".button");
let closeButton = document.querySelector(".close_button");
let form = document.querySelector(".apply_to_doctor");
let select = document.getElementById('select');
let requestButton = document.querySelector(".btn-creat-request");
let inputs = document.querySelectorAll(".input-form");
let cardiologistForms = document.querySelectorAll(".form-cardiologist");
let therapistForms = document.querySelectorAll(".form-therapist");
let dentistForm = document.querySelectorAll(".form-dentist");

closeButton.onclick = function () {
    resetForm();
};

document.body.addEventListener("click", function (event) {
    let target = event.target;
    console.log(target);

    while (target.tagName !== 'BODY') {
        if (target === form) {
            form.classList.add("active");
            return;
        }
        else if (target === button) {
            inputs.forEach(function (form) {
                form.value = "";
            });
            select.value = "select_doctor";
            document.querySelector(".container-for-form").classList.remove("active");
            form.classList.add("active");
            return;
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
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose) {
        this._doc = doctor;
        this._userName = name;
        this._userSurname = surname;
        this._userPatronymic = patronymic;
        this._currentDate = dateOfVisit;
        this._target = purpose;
    }
}

class Therapist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, age) {
        super (doctor, name, surname, patronymic, dateOfVisit, purpose);
        this._userAge = age;
    }
}

class Cardiologist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, pressure, bmi, diseasesCS, age) {
        super (doctor, name, surname, patronymic, dateOfVisit, purpose);
        this._userPressure = pressure;
        this._userBMI = bmi;
        this._userDiseasesCS = diseasesCS;
        this._age = age;
    }
}

class Dentist extends Visit {
    constructor(doctor, name, surname, patronymic, dateOfVisit, purpose, lastVisit) {
        super(doctor, name, surname, patronymic, dateOfVisit, purpose);
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
        let age = document.querySelector(".age-therapist").value;
        if (name && surname && patronymic && dateOfVisit && purpose && age !== false) {
            let visitTherapist = new Therapist(doctor, name, surname, patronymic, dateOfVisit, purpose, age);
            console.log(visitTherapist);
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






