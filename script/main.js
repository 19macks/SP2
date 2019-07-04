function toggle(el) {
    el.style.display = (el.style.display === 'none') ? 'block' : 'none'
}

let request_doctor = document.querySelector(".apply_to_doctor");
let btnNewReq = document.querySelector(".button");

btnNewReq.addEventListener('click', () => {
    if (request_doctor.getAttribute('class') === "apply_to_doctor" ) {
        request_doctor.classList.add('active')
    }
})

let selectDoctor = document.querySelector('#select-doctor')
let doctors = document.querySelectorAll('.doctor');

selectDoctor.addEventListener('click', (event) => {
    let doctors = document.querySelectorAll('.doctor')
    let forms = document.querySelectorAll('.form-request')
    console.log(event.target);
    // if (event.target.getAttribute('data')  ) {
    //     doctors.getAttribute()
    // }
    //
    // eve
    // doctors.forEach((el) => {
    //
    // })

})
