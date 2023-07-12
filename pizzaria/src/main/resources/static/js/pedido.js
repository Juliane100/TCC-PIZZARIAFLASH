const stepButtons = document.querySelectorAll('.botão-passo');
const contentDivs = document.querySelectorAll('.card');
const progress = document.querySelector('#progress');

let currentStep = 0;

stepButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index !== currentStep) {
            progress.setAttribute('value', (index + 1) * (100 / stepButtons.length));

            contentDivs.forEach((div, divIndex) => {
                if (divIndex !== index && div.classList.contains('show')) {
                    div.classList.remove('show');
                }
            });

            contentDivs[index].classList.add('show');

            currentStep = index;
        }
    });
});
