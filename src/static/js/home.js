$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#usuario').text(`Bem vindo, ${getLogin().name}`);
});

const getLogin = () => {
    return JSON.parse(localStorage.getItem('login'));
}