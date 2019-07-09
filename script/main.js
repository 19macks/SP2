let button = document.querySelector(".button");
let closeButton = document.querySelector(".close_button");
let form = document.querySelector(".apply_to_doctor");
let select = document.getElementById('select');


button.onclick = function () {
    form.classList.add("active");

};


closeButton.onclick = function () {
    form.classList.remove("active")
};

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



