$(document).ready(function () {
    $('.toast').toast('show');
});

function preViewImg() {
    var imgPreView = new FileReader();
    imgPreView.readAsDataURL(document.getElementById("uploadImage").files[0]);

    imgPreView.onload = function (imgPreViewEvent) {
        document.getElementById("preView").src = imgPreViewEvent.target.result;
    }
}

