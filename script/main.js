
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
const btnCreatRequest = document.querySelector('.btn-creat-request')
const forms = document.querySelectorAll('.form-request')
const inputForm = document.querySelectorAll('.input-form')
selectDoctor.addEventListener('click',function () {
    if (this.value) {
        forms.forEach((form)=>{
            if (form.getAttribute('data-doc') === this.value) {
                form.classList.add('active')
                btnCreatRequest.classList.add('active')

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