document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('form');

    //regex
    //bez brojeva u imenu
    //email moze koristiti slova i brojeve
    //password mora imati po jedno barem, malo, veliko slovo,
    //najmanje jedan broj i najmanje jedan od znakova: !#$%^&*
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9]{1,25}@[a-zA-Z]{1,15}\.(com|org|ba|de)$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%^&*]).{1,25}$/;


    //funkcija emptyNotSelected prima parametre ID od polja
    //drugi parametar je tekst za gresku
    //ova funkcija radi ono sto i pise, u slucaju da korisnik
    //prvo selektuje input polje a zatim ako nista ne unese
    //a ode na drugi input ispisat ce mu da je polje required
    emptyNotSelected('FirstName', 'First name is required');
    emptyNotSelected('Username', 'Username is required');
    emptyNotSelected('Email', 'Email is required');
    emptyNotSelected('Password', 'Password is required');


    //ova funkcija  backNwrite prima jedan parametar a to je ID polja
    //ona radi uz funkciju emptyNotSelected, nakon sto se korisnik
    //vrati pa pocne unositi tekst u input polje, greska se uklanja
    backNwrite('FirstName');
    backNwrite('Username');
    backNwrite('Email');
    backNwrite('Password');


    document.getElementById('Password').addEventListener('focus', showPasswordRequirements);

    form.addEventListener('submit', function (event) {
        clearErrors();

        //koristim .value.trim(); da bih izbjegli prazne prostore ' '
        const firstName = document.getElementById('FirstName').value.trim();
        const lastName = document.getElementById('LastName').value.trim();
        const username = document.getElementById('Username').value.trim();
        const email = document.getElementById('Email').value.trim();
        const password = document.getElementById('Password').value.trim();

        let isValid = true;

        //provjeravamo dijelove forme i njihove regexe ukoliko ih imaju
        if (!firstName || !nameRegex.test(firstName)) {
            showError('FirstName', 'First name is required');
            isValid = false;
        }

        if (lastName && !nameRegex.test(lastName)) {
            showError('LastName', 'Contain only letters');
            isValid = false;
        }

        if (!username) {
            showError('Username', 'Username is required.');
            isValid = false;
        }

        if (!email || !emailRegex.test(email)) {
            showError('Email', 'Email is invalid');
            isValid = false;
        }
        
        if (!password || !passwordRegex.test(password)) {
            showError('Password', 'Password invalid');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    //provjeravamo da li u passwordu se nalaze stvari iz regexa, te posebnim dijelom
    //koda prikazujemo da li je uslov ispunjen
    //ako je krug zelen, uslov je ispunjen
    //ako je krug crven, uslov nije ispunjen
    document.getElementById('Password').addEventListener('input', function () {
        const password = this.value;

        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*]/;

        //provjeravamo to za svaki dio regexa
        if (lowercaseRegex.test(password)) {
            document.getElementById('lowercase-circle').classList.add('valid');
        } else {
            document.getElementById('lowercase-circle').classList.remove('valid');
        }


        if (uppercaseRegex.test(password)) {
            document.getElementById('uppercase-circle').classList.add('valid');
        } else {
            document.getElementById('uppercase-circle').classList.remove('valid');
        }


        if (numberRegex.test(password)) {
            document.getElementById('number-circle').classList.add('valid');
        } else {
            document.getElementById('number-circle').classList.remove('valid');
        }


        if (specialCharRegex.test(password)) {
            document.getElementById('special-char-circle').classList.add('valid');
        } else {
            document.getElementById('special-char-circle').classList.remove('valid');
        }
    });

    //prikaz tog dijela ispod passworda onda kada korisnik dode do tog inputa
    function showPasswordRequirements() {
        document.querySelector('.password-requirements').style.display = 'block';
        const requirementCircles = document.querySelectorAll('.requirement-circle');


        requirementCircles.forEach(function (circle) {
            circle.classList.add('invalid');
        });
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.innerHTML = message;
        errorElement.style.color = 'red';
    }
    function clearRequirementError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.innerHTML = '';
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(function (error) {
            error.innerHTML = '';
        });
    }

    function emptyNotSelected(fieldId, errorMessage) {
        document.getElementById(fieldId).addEventListener('blur', function () {
            if (!this.value.trim()) {
                showError(fieldId, errorMessage);
            }
        });
    }

    function backNwrite(fieldId) {
        document.getElementById(fieldId).addEventListener('input', function () {
            clearRequirementError(fieldId);
        });
    }
});
