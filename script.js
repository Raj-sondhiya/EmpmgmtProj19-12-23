var empDataArray = [];


$("#empFormSubmit").click(a => {
    var fName = $("#fName").val();
    var lName = $("#lName").val();
    var email = $("#email").val();
    var pwd = $("#pwd").val();

    var empData = {
        fName: fName,
        lName: lName,
        email: email,
        pwd: pwd
    }

    if (empDataArray.some(existingEmp => existingEmp.email === email)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email already exists",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }

    var secret = "AESencryption";
    empData.pwd = CryptoJS.AES.encrypt(pwd, secret).toString();
    var bytes = CryptoJS.AES.decrypt(empData.pwd, secret);
    console.log(bytes.toString(CryptoJS.enc.Utf8));


    var emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

    fName === "" || lName === "" || pwd === "" || !emailPattern.test(email) ? errorOnSubmit() : submitData(empData);
    renderTable();
});



/*
    $(".btn-danger").click(a=>{
         alert('hello');
     })
    The above code will not work on delete button because it is injected dynamically due to which mouseEvents are not binded with it.
*/



$('body').on('click', '.btn-danger', function () {

    Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(this).attr("id");
            empDataArray = empDataArray.filter(a => a.email !== id);
            renderTable();
            Swal.fire({
                title: "Deleted!",
                text: "Employee details deleted.",
                icon: "success"
            });
        }
    });
})

function renderTable() {
    var empHtmlString = "";
    empDataArray.forEach(a => {
        empHtmlString += "<tr>"
        empHtmlString += "<td>" + a.fName + "</td>"
        empHtmlString += "<td>" + a.lName + "</td>"
        empHtmlString += "<td>" + a.email + "</td>"
        empHtmlString += "<td>" + a.pwd + "</td>"
        empHtmlString += `<td><button class="btn-lg btn btn-danger fa fa-trash-o" id="${a.email}"></button></td>`
        empHtmlString += "</tr>"

    })
    $("#empData").html(empHtmlString);
}

function clearFields() {
    $("#fName").val("");
    $("#lName").val("");
    $("#email").val("");
    $("#pwd").val("");
}

function submitData(empData) {
    empDataArray.push(empData);
    clearFields();
    Swal.fire({
        title: "Employee data has been stored",
        text: "Data saved",
        icon: "success"
    });
}

function errorOnSubmit() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter correct details",
        footer: '<a href="#">Why do I have this issue?</a>'
    });
}