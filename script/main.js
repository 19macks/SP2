
//Активировать форму выбора врача
const request_doctor = document.querySelector(".apply_to_doctor")
const btnNewReq = document.querySelector(".button")
btnNewReq.addEventListener('click', () => {
    if (request_doctor.getAttribute('class') === "apply_to_doctor" ) {
        request_doctor.classList.add('active')
    }
})
//Выбрать определенного врача
const selectDoctor = document.querySelector('#select-doctor')
const btnCreatVisit = document.querySelector('.btn-creat-request')
const forms = document.querySelectorAll('.form-request')
const inputForm = document.querySelectorAll('.input-form')
selectDoctor.addEventListener('click',function () {
    if (this.value) {
        forms.forEach((form)=>{
            if (form.getAttribute('data-doc') === this.value) {
                form.classList.add('active')
                btnCreatVisit.classList.add('active')

                inputForm.forEach((input) => {
                    input.value = ''
                })
            } else {
                form.classList.remove('active')
            }
        })
    }
})
//Закрыть крестиком форму выбора врача с обнулением инпутов
const btnClosed = document.querySelector('.fa-times')
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
//Отправка данных. Проверка на заполненые строки
const sendDataVisit = document.querySelector('.btn-creat-request')
///////////////////////////////////////////////////////////
/////////////////////// C_L_A_S_S /////////////////////////
///////////////////////////////////////////////////////////

class Visit {
    constructor (surname, name, patronymic, purpose_of_visit, comments) {
        this._user = [surname, name, patronymic]
        this._visit = purpose_of_visit
        this._comments = comments

    }
}

class Therapist extends Visit {

}

let  visit = new Visit()
console.log(visit);
let therapist = new Therapist('Pan', "Artem", 'Grigorovich',"Life" )
console.log(therapist);

/*
selectDoctor.addEventListener('click', function (event) {

})*/


