const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then( userCredential => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signUpForm.reset();
    });

});