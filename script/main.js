const btnNewReq = document.querySelector(".button")
const btnClosed = document.querySelector('.fa-times')
const btnCreatVisit = document.querySelector('.btn-creat-request')
const selectDoctor = document.querySelector('#select-doctor')
const forms = document.querySelectorAll('.form-request')
const request_doctor = document.querySelector(".apply_to_doctor")
const inputForm = document.querySelectorAll('.input-form')
const inputFormTherapist = document.querySelectorAll('.input-form-therapist')
const inputFormCardiologist = document.querySelectorAll('.input-form-cardiologist')
const inputFormDentist = document.querySelectorAll('.input-form-dentist')
const doctors = document.querySelectorAll('.doctor')
let active_doctor

let doc
let surname
let name
let patronymic
let age
let purposeOfVisit
let comments
let heartPressure
let indexMass
let disease
let lastVisit

let visit
let board_visit = []
///////////////////////////////////////////////////////////
/////////////////////// C_L_A_S_S /////////////////////////
///////////////////////////////////////////////////////////
class Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments) {
        this._doctor = doc
        this._userSurname = surname
        this._userName = name
        this._userPatronymic = patronymic
        this._visit = purposeOfVisit
        this._comments = comments
    }

    creatVisit () {

    }
}

class Therapist extends Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments, age ) {
        super(doc, surname, name, patronymic, purposeOfVisit, comments)
        this._age = age
    }
}

class Cardiologist extends Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments, heart_pressure, index_mass, disease) {
        super(doc, surname, name, patronymic, purposeOfVisit, comments)
        this._pressure = heart_pressure
        this._indexMass = index_mass
        this._disease = disease
    }
}

class Dentist extends Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments, lastVisit) {
        super(doc, surname, name, patronymic, purposeOfVisit, comments)
        this._lastVisit = lastVisit
    }
}


//Активировать форму выбора врача
btnNewReq.addEventListener('click', () => {
    if (request_doctor.getAttribute('class') === "apply_to_doctor" ) {
        request_doctor.classList.add('active')
        btnCreatVisit.classList.remove('active')
        active_doctor = undefined
    }
})

//Выбрать определенного врача
selectDoctor.addEventListener('click',function () {

    if (this.value) {
        forms.forEach((form)=>{
            if (form.getAttribute('data-doc') === this.value) {
                form.classList.add('active')
                btnCreatVisit.classList.add('active')
                active_doctor = this.value
                inputForm.forEach((input) => {
                    input.value = ''
                })
            } else {
                form.classList.remove('active')
            }
        })
    }
})

//Функция обнуления формы
function resetForm () {
    request_doctor.classList.remove('active')
    inputForm.forEach((input) => {
        input.value = ''
    })
    forms.forEach((form) => {
        form.classList.remove('active')
    })
    selectDoctor.value = 'select'
}


//Отправка данных. Проверка на заполненые строки
btnCreatVisit.addEventListener('click', () => {
    let resultCheckInp
    let arrVisit

      function CheckInp(arrInp) {
        return (arrInp.every((val) => {return (val == true)}))
    }

    function fullInput (arr) {
        resultCheckInp = CheckInp(arrVisit)
        if (resultCheckInp) {
            board_visit.push(visit)
            resetForm()
        } else {
            alert ('Заполните все поля')
        }
    }

    if (active_doctor === 'therapist') {
        doc = "Терапевт"
        surname = document.querySelector('.surname-therapist').value
        name = document.querySelector('.name-therapist').value
        patronymic = document.querySelector('.patronymic-therapist').value
        age = document.querySelector('.age-therapist').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-therapist').value
        comments = document.querySelector('.comments-therapist').value

        visit = new Therapist(doc, surname, name, patronymic, purposeOfVisit, comments, age)
        arrVisit = [surname, name, patronymic, purposeOfVisit, comments, age]
        resultCheckInp = CheckInp(arrVisit)

        if (resultCheckInp) {
            board_visit.push(visit)
            resetForm()
        } else {
            alert ('Заполните все поля')
        }

    } else if (active_doctor === 'cardiologist') {
        doc = "Кардиолог"
        surname = document.querySelector('.surname-cardiologist').value
        name = document.querySelector('.name-cardiologist').value
        patronymic = document.querySelector('.patronymic-cardiologist').value
        age = document.querySelector('.age-cardiologist').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-cardiologist').value
        heartPressure = document.querySelector('.heart_pressure').value
        indexMass = document.querySelector('.index_mass').value
        disease = document.querySelector('.disease').value
        comments = document.querySelector('.comments-cardiologist').value

        visit = new Cardiologist(doc, surname, name, patronymic, purposeOfVisit, comments, heartPressure, indexMass, disease)
        arrVisit = [surname, name, patronymic, purposeOfVisit, comments, heartPressure, indexMass, disease]
        resultCheckInp = CheckInp(arrVisit)

        board_visit.push(visit)
        resetForm()
    } else if (active_doctor === 'dentist') {
        doc = "Стоматолог"
        surname = document.querySelector('.surname-dentist').value
        name = document.querySelector('.name-dentist').value
        patronymic = document.querySelector('.patronymic-dentist').value
        lastVisit = document.querySelector('.last_visit').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-dentist').value
        comments = document.querySelector('.comments-dentist').value

        visit = new Dentist (doc, surname, name, patronymic, purposeOfVisit, comments, lastVisit)
        arrVisit = [surname, name, patronymic, purposeOfVisit, comments, lastVisit]
        resultCheckInp = CheckInp(arrVisit)

        board_visit.push(visit)
        resetForm()
    }
console.log(board_visit);
    return board_visit
})


//Закрыть крестиком форму выбора врача с обнулением инпутов
btnClosed.addEventListener('click', function () {
    resetForm()
})





