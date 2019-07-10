const btnNewReq = document.querySelector(".button")
const btnClosed = document.querySelector('.fa-times')
const btnCreatVisit = document.querySelector('.btn-creat-request')
const selectDoctor = document.querySelector('#select-doctor')
const forms = document.querySelectorAll('.form-request')
const request_doctor = document.querySelector(".apply_to_doctor")
const inputForm = document.querySelectorAll('.input-form')
const board = document.querySelector('.board')
const body = document.querySelector('body')
const notFound = document.querySelector('.not-found ')


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
let boardVisit = []

let seriaBoard

loadDataLocalSt()
creatItemVisitInStart()
//////////// C_L_A_S_S ////////////
class Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments) {
        this._idUser = `${surname}${name}`
        this._doctor = doc
        this._userSurname = surname
        this._userName = name
        this._userPatronymic = patronymic
        this._visit = purposeOfVisit
        this._comments = comments
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
//Скрыть форму выбора врача по клику рядом
selectDoctor.addEventListener('blur', () => {
    request_doctor.classList.remove('active')
})

/*
body.addEventListener('click', (event) => {
    // if (request_doctor.getAttributeNames() )
    if (event.target !== request_doctor && event.target.parentElement !== request_doctor
        && event.target !== btnNewReq && event.target.parentElement.tagName !== 'SELECT'
        && event.target.parentElement.tagName !== 'FORM' && event.target.parentElement.tagName !== 'LABEL') {
        request_doctor.classList.remove('active')
    } else {
        console.log(event.target.parentElement.tagName);
    }
})
*/
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
//Отправка данных с проверкой на заполненые строки
btnCreatVisit.addEventListener('click', () => {
    if (active_doctor === 'therapist') {
        doc = "Терапевт"
        surname = document.querySelector('.surname-therapist').value
        name = document.querySelector('.name-therapist').value
        patronymic = document.querySelector('.patronymic-therapist').value
        age = document.querySelector('.age-therapist').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-therapist').value
        comments = document.querySelector('.comments-therapist').value

        if (surname && name && patronymic && age && purposeOfVisit !== false) {
            visit = new Therapist(doc, surname, name, patronymic, purposeOfVisit, comments, age)
            writeVisitInArrAndLocalSt()
            creatNewCardVisit()
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

        if (surname && name && patronymic && age && purposeOfVisit && heartPressure && indexMass && disease !== false) {
            visit = new Cardiologist(doc, surname, name, patronymic, purposeOfVisit, comments, heartPressure, indexMass, disease)
            writeVisitInArrAndLocalSt()
            creatNewCardVisit()
            resetForm()
        } else {
            alert ('Заполните все поля')
        }
    } else if (active_doctor === 'dentist') {
        doc = "Стоматолог"
        surname = document.querySelector('.surname-dentist').value
        name = document.querySelector('.name-dentist').value
        patronymic = document.querySelector('.patronymic-dentist').value
        lastVisit = document.querySelector('.last_visit').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-dentist').value
        comments = document.querySelector('.comments-dentist').value

        if (surname && name && patronymic && lastVisit && purposeOfVisit !== false) {
            visit = new Dentist (doc, surname, name, patronymic, purposeOfVisit, comments, lastVisit)
            writeVisitInArrAndLocalSt()
            creatNewCardVisit()
            resetForm()
        } else {
            alert ('Заполните все поля')
        }
    }
    return boardVisit
})
//Закрыть крестиком форму выбора врача с обнулением инпутов
btnClosed.addEventListener('click', function () {
    resetForm()
})
//Удаляем крестиком карточку визита
board.addEventListener('click', (event) => {
    if ( event.target.tagName === 'I' ) {
        boardVisit = boardVisit.filter((visit) => {
            return visit._idUser !== (event.target.parentElement.getAttribute('data-user'))
        })
        event.target.parentElement.remove()
        seriaBoard = JSON.stringify(boardVisit)
        localStorage.setItem("Board_Visit", seriaBoard)
        if (boardVisit.length === 0) {
            notFound.classList.remove('not-active')
        }
    }
})


// Load from Local Storage
function loadDataLocalSt () {
    if (localStorage.Board_Visit) {
        boardVisit = JSON.parse(localStorage.getItem('Board_Visit'))
    }
}
// Creat cards visit on load from Local Storage
function creatItemVisitInStart () {
    if (boardVisit.length === 0) {
        notFound.classList.remove('not-active')
    } else {
        notFound.classList.add('not-active')
    }
    if (localStorage.Board_Visit) {
        boardVisit.forEach((visit) => {
            let divVisit = document.createElement('div')
                divVisit.classList.add('request')
                divVisit.setAttribute('data-user', `${visit._userSurname}${visit._userName}`)
                board.appendChild(divVisit)
                divVisit.innerHTML = ' <i class="request-closed fa fa-times" aria-hidden="true"></i>'
            let spanSurnameUser = document.createElement('p')
                divVisit.appendChild(spanSurnameUser)
                spanSurnameUser.innerHTML = `Фамилия : ${visit._userSurname}`
            let spanNameUser = document.createElement('p')
                divVisit.appendChild(spanNameUser)
                spanNameUser.innerHTML = `Имя : ${visit._userName}`
            let spanDoctor = document.createElement('p')
            divVisit.appendChild(spanDoctor)
            spanDoctor.innerHTML = `Доктор : ${visit._doctor}`
            let spanMoreInfo = document.createElement('p')
            divVisit.appendChild(spanMoreInfo)
            spanMoreInfo.classList.add('more-info')
            spanMoreInfo.innerText = 'ПОКАЗАТЬ БОЛЬШЕ'
        })
    }
}
//Function reset form
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
//Write new visit in arr & Local Storage
function writeVisitInArrAndLocalSt() {
    boardVisit.push(visit)
    seriaBoard = JSON.stringify(boardVisit)
    localStorage.setItem("Board_Visit", seriaBoard)
}
//Creat new visit
function creatNewCardVisit() {
    notFound.classList.add('not-active')
    let divVisit = document.createElement('div')
    divVisit.classList.add('request')

    board.appendChild(divVisit)
    divVisit.innerHTML = ' <i class="request-closed fa fa-times" aria-hidden="true"></i>'
    let spanSurnameUser = document.createElement('p')
    divVisit.appendChild(spanSurnameUser)
    divVisit.setAttribute('data-user', `${surname}${name}`)
    spanSurnameUser.innerHTML = `Фамилия : ${surname}`
    let spanNameUser = document.createElement('p')
    divVisit.appendChild(spanNameUser)
    spanNameUser.innerHTML = `Имя : ${name}`
    let spanDoctor = document.createElement('p')
    divVisit.appendChild(spanDoctor)
    spanDoctor.innerHTML = `Доктор : ${doc}`
    let spanMoreInfo = document.createElement('p')
    divVisit.appendChild(spanMoreInfo)
    spanMoreInfo.classList.add('more-info')
    spanMoreInfo.innerText = 'ПОКАЗАТЬ БОЛЬШЕ'
}
