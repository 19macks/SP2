const btnNewReq = document.querySelector(".button")
const btnClosed = document.querySelector('.fa-times')
const btnCreatVisit = document.querySelector('.btn-creat-request')
const selectDoctor = document.querySelector('#select-doctor')
const forms = document.querySelectorAll('.form-request')
const request_doctor = document.querySelector(".apply_to_doctor")
const inputForm = document.querySelectorAll('.input-form')
const input = document.querySelectorAll('.input-form')
const doctors = document.querySelectorAll('.doctor')
let activ_doctor
let doc = activ_doctor

let surname
let name
let patronymic
let age
let purposeOfVisit
let comments
let heart_pressure
let index_mass
let disease
let newVisit

let visit
///////////////////////////////////////////////////////////
/////////////////////// C_L_A_S_S /////////////////////////
///////////////////////////////////////////////////////////
class Visit {
    constructor (surname, name, patronymic, purpose_of_visit, comments) {
        this._user = [surname, name, patronymic]
        this._visit = purpose_of_visit
        this._comments = comments
    }

    creatVisit () {

    }
}

class Therapist extends Visit {
    constructor (surname, name, patronymic, purpose_of_visit, comments, age ) {
        super(surname, name, patronymic, purpose_of_visit, comments)
        this._age = age
    }
}

class Cardiologist extends Visit {
    constructor (surname, name, patronymic, purpose_of_visit, comments, doc, heart_pressure, index_mass, disease) {
        super(surname, name, patronymic, purpose_of_visit, comments, doc)
        this._pressure = heart_pressure
        this.index_mass = index_mass
        this._disease = disease
    }
}

class Dentist extends Visit {
    constructor (surname, name, patronymic, purpose_of_visit, comments, doc, last_visit) {
        super(surname, name, patronymic, purpose_of_visit, comments, doc)
        this._last_visit = last_visit
    }
}


//Активировать форму выбора врача
btnNewReq.addEventListener('click', () => {
    if (request_doctor.getAttribute('class') === "apply_to_doctor" ) {
        request_doctor.classList.add('active')
    }
})

//Выбрать определенного врача
selectDoctor.addEventListener('click',function () {
    if (this.value) {
        forms.forEach((form)=>{
            if (form.getAttribute('data-doc') === this.value) {
                form.classList.add('active')
                btnCreatVisit.classList.add('active')
                activ_doctor = this.value
                inputForm.forEach((input) => {
                    input.value = ''
                })
            } else {
                form.classList.remove('active')
            }
        })
    }
})

//Отправка данных. Проверка на заполненые строки
btnCreatVisit.addEventListener('click', (event) => {
    if (activ_doctor === 'therapist') {
        surname = document.querySelector('.surname-therapist').value
        name = document.querySelector('.name-therapist').value
        patronymic = document.querySelector('.patronymic-therapist').value
        age = document.querySelector('.age').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-therapist').value
        comments = document.querySelector('.comments-therapist').value
        visit = new Therapist(surname, name, patronymic, purpose_of_visit, comments, age)
    }
    return visit
})

        // input.forEach((inp) => {
    //     if (activ_doctor === inp.getAttribute('data-input'))
    //     console.log(inp.value);
    // })

//Закрыть крестиком форму выбора врача с обнулением инпутов
btnClosed.addEventListener('click', function () {
    request_doctor.classList.remove('active')
    inputForm.forEach((input) => {
        input.value = ''
    })
    forms.forEach((form) => {
        form.classList.remove('active')
    })
        selectDoctor.value = 'select'
})





