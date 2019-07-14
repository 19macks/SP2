const btnNewReq = document.querySelector(".button")
const btnClosed = document.querySelector('.fa-times')
const btnCreatVisit = document.querySelector('.btn-creat-request')
const selectDoctor = document.querySelector('#select-doctor')
const forms = document.querySelectorAll('.form-request')
const request_doctor = document.querySelector(".apply_to_doctor")
const wrapRequestDoctor = document.querySelector('.wrap-form-apply-doctor')
const inputForm = document.querySelectorAll('.input-form')
const board = document.querySelector('.board')
const notFound = document.querySelector('.not-found ')
let seriaBoard

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
///////////////////////////////////
loadDataLocalSt()
creatItemVisitInStart()
////////////Drag&Drop//////////////
// let curentCard
// let start
// let shiftX = 0
// let shiftY = 0
// let dragStatus = false
//
// board.addEventListener('mousedown', (event) => {
//     if (event.target.className === 'request' || event.target.parentElement.className  === 'board') {
//         curentCard = event.target
//         dragStatus = true
//         let coordinatesX = event.pageX
//         console.log(coordinatesX);
//         let coordinatesY = event.pageY
//         console.log(coordinatesY);
//         shiftX = event.pageX
//         console.log(shiftX);
//         shiftY = event.pageY
//         console.log(shiftY);
//         console.log("/////////////////");
//         curentCard.style.position = 'fixed';
//         curentCard.style.left = "px(coordinatesX - event.offsetX)";
//         curentCard.style.top = px(coordinatesY - event.offsetY);
//
//
//     }
// })




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
        wrapRequestDoctor.classList.add('active')
        btnCreatVisit.classList.remove('active')
        active_doctor = undefined
    }
})
//Закрыть форму выбора врача по клику рядом с обнулением инпутов
wrapRequestDoctor.addEventListener('click', (event) => {
    if (event.currentTarget === event.target)
    resetForm()
})
//Закрыть форму выбора врача крестиком с обнулением инпутов
btnClosed.addEventListener('click', function () {
    resetForm()
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
//Обработчик событий доски (карточек)
board.addEventListener('click', (event) => {
    let target = event.target
    let attribute = target.parentElement.getAttribute('data-user')
    // Удаляем крестиком карточку визита
    if ( target.tagName === 'I' ) {
        boardVisit = boardVisit.filter((visit) => {
            return visit._idUser !== (target.parentElement.getAttribute('data-user'))
        })
        target.parentElement.remove()
        seriaBoard = JSON.stringify(boardVisit)
        localStorage.setItem("Board_Visit", seriaBoard)
        if (boardVisit.length === 0) {
            notFound.classList.remove('not-active')
        }
    }
    // Скрыть информацию // Показать больше
    if  ( target.className === 'show-info') {
        boardVisit.forEach((visit) => {
            if ( attribute === visit._idUser) {
                let parentDiv = target.parentElement
                for (let key in visit) {
                    switch (key) {
                        case '_visit':
                            let spanPurposeOfVisit = document.createElement('p')
                            parentDiv.appendChild(spanPurposeOfVisit)
                            spanPurposeOfVisit.classList.add('more-info')
                            spanPurposeOfVisit.innerHTML = `Цель визита : ${visit._visit}`
                            break
                        case '_age':
                            let spanAge = document.createElement('p')
                            parentDiv.appendChild(spanAge)
                            spanAge.classList.add('more-info')
                            spanAge.innerHTML = `Возраст : ${visit._age}`
                            break
                        case '_pressure':
                            let spanPressure = document.createElement('p')
                            parentDiv.appendChild(spanPressure)
                            spanPressure.classList.add('more-info')
                            spanPressure.innerHTML = `Обычное давление : ${visit._pressure}`
                            break
                        case '_indexMass':
                            let spanIndexMass = document.createElement('p')
                            parentDiv.appendChild(spanIndexMass)
                            spanIndexMass.classList.add('more-info')
                            spanIndexMass.innerHTML = `Индекс массы : ${visit._indexMass}`
                            break
                        case '_disease':
                            let spanDisease = document.createElement('p')
                            parentDiv.appendChild(spanDisease)
                            spanDisease.classList.add('more-info')
                            spanDisease.innerHTML = `Заболевания : ${visit._disease}`
                            break
                        case '_lastVisit':
                            let spanLastVisit = document.createElement('p')
                            parentDiv.appendChild(spanLastVisit)
                            spanLastVisit.classList.add('more-info')
                            spanLastVisit.innerHTML = `Последний визит : ${visit._lastVisit}`
                            break
                        case '_comments':
                            let spanComments = document.createElement('p')
                            parentDiv.appendChild(spanComments)
                            spanComments.classList.add('more-info')
                            spanComments.innerHTML = `Коментарии : ${visit._comments}`
                            break
                    }
                }
            }
        })
        target.parentElement.appendChild(target)
        target.innerText = 'СКРЫТЬ'
        target.classList.remove('show-info')
        target.classList.add('hide-info')
    } else if( target.className === 'hide-info' ) {
        target.parentElement.querySelectorAll('.more-info').forEach((child) => {
        child.remove()
        })
        target.innerText = 'ПОКАЗАТЬ БОЛЬЩЕ'
        target.classList.add('show-info')
        target.classList.remove('hide-info')
    }
})
//Обработчик собітий доски Drag & Drop
board.addEventListener('dragover', function (event) {
    event.preventDefault ()
    event.dataTransfer.dropEffect = 'move'
})
board.addEventListener('drop', function (event) {

    let dragVisit = board.querySelector('.dragstart')
    dragVisit.style.height = '118px'

    dragVisit.style.position = 'absolute'
    dragVisit.style.top = `${event.pageY -360}px`
    dragVisit.style.left = `${event.pageX - 363}px`


    // dragVisit.style.top = `${(event.pageY - dragVisit.offsetWidth / 2) -300}px`
    // dragVisit.style.left = `${(event.pageX - dragVisit.offsetWidth / 2)- 403}px`

    // dragVisit.style.top = `${event.pageY -300}px`
    // dragVisit.style.left = `${event.pageX - 403}px`

})

// Load from Local Storage
function loadDataLocalSt () {
    if (localStorage.Board_Visit) {
        boardVisit = JSON.parse(localStorage.getItem('Board_Visit'))
    }
}
// Creat cards visit on load from Local Storage
function creatItemVisitInStart () {
    if (boardVisit.length) {
        notFound.classList.add('not-active')
        boardVisit.forEach((visit) => {
            let divVisit = document.createElement('div')
                divVisit.classList.add('request')
                divVisit.setAttribute('draggable', 'true')
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
            spanMoreInfo.classList.add('show-info')
            spanMoreInfo.innerText = 'ПОКАЗАТЬ БОЛЬШЕ'

            divVisit.addEventListener('dragstart', function(event) {
                this.classList.add('dragstart')
                console.log('START');
            })
            divVisit.addEventListener('dragend', function(event) {
                this.classList.remove('dragstart')
                console.log('END');

                // let coordinateX = event.pageX
                // let coordinateY = event.pageY
                //
                // this.style.position = 'absolute'
                // this.style.top = `${coordinateY - 337}px`
                // this.style.left = `${coordinateX - 238}px`

            })
        })
    } else {
        notFound.classList.remove('not-active')
    }
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
    divVisit.setAttribute('draggable', 'true')
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
    spanMoreInfo.classList.add('show-info')
    spanMoreInfo.innerText = 'ПОКАЗАТЬ БОЛЬШЕ'
}
//Function reset form
function resetForm () {
    wrapRequestDoctor.classList.remove('active')
    inputForm.forEach((input) => {
        input.value = ''
    })
    forms.forEach((form) => {
        form.classList.remove('active')
    })
    selectDoctor.value = 'select'
}