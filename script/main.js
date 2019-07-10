let button = document.querySelector(".button");
let closeButton = document.querySelector(".close_button");
let form = document.querySelector(".apply_to_doctor");
let select = document.getElementById('select');

closeButton.onclick = function () {
    form.classList.remove("active")
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


function removeActiveOfFormRequest() {
    Array.from(document.getElementsByClassName("form-request")).forEach(function (elem) {
        elem.classList.remove("active")
    });
}


