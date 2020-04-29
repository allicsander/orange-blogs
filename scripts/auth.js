//post data
auth.onAuthStateChanged(user =>{
    if(user){
        fs.collection('posts').onSnapshot(snapshot => {
        setupPosts(user, snapshot.docs);
        loginCheck(user);
        }, error =>{
            console.log(error.message);
        });
    }else{
        setupPosts(user=null,[]);
        loginCheck();
    }
});



//create new post
const createPost = document.querySelector('#create-form');
createPost.addEventListener('submit', e =>{
    e.preventDefault();

    fs.collection('posts').add({
        title: createPost.title.value,
        content: createPost.content.value
    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createPost.reset();
        console.log('Document happily created');
    }).catch( error =>{
        console.error('Sorry, but we have got an error:', error);
    });

});


//sign up
const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    const makeAdmin = functions.httpsCallable('makeAdmin');
    makeAdmin({email: email}).then(result =>{
        console.log(result);
    });

    auth.createUserWithEmailAndPassword(email, password).then( userCredential => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signUpForm.reset();
    });

});

//login
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    const makeAdmin = functions.httpsCallable('makeAdmin');
    makeAdmin({email: email}).then(result =>{
        console.log(result);
    });

    auth.signInWithEmailAndPassword(email, password).then( userCredential => {
        console.log("happily signed in");
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });

});

//logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then( ()=> {
       console.log("signed out");
    });
});

//login with google
const googleButton = document.querySelector('#googleLogin');
googleButton.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result){
        console.log(result);
        console.log("Successful Google Sign in");


    }).catch(function(error){
        console.log(error);
        console.log("google login failed");
    });

});


//login with facebook
const facebookButton = document.querySelector('#facebookLogin');
facebookButton.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();

    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(function(result){
        console.log(result);
        console.log("Successful Facebook Sign in");


    }).catch(function(error){
        console.log(error);
        console.log("Facebook login failed");
    });

});

