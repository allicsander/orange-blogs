const postList = document.querySelector('.posts');

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const adminLinks = document.querySelectorAll('.admin');


const loginCheck = user => {
    if(user){
        loggedInLinks.forEach(link => link.style.display='block' );
        loggedOutLinks.forEach(link => link.style.display='none' );
        adminLinks.forEach(link => link.style.display='block' ); 
        user.getIdTokenResult().then(idTokenResult => {
          if(idTokenResult.claim.admin){
            adminLinks.forEach(link => link.style.display='block' );
          }
        }).catch(err=>err);  // it's missing or insufficient permissions yet 
    }else{
        loggedInLinks.forEach(link => link.style.display='none' );
        loggedOutLinks.forEach(link => link.style.display='block' );
        adminLinks.forEach(link => link.style.display='none' );
    }
};

const setupPosts = (user, data) =>{

  if(data.length){

    let html =``;
    data.forEach( document =>{

       const post = document.data();
       const li = `
       <li>
       <div class="collapsible-header grey lighten-4" style="display:block">${post.title}
           <div class="adminControls right">
               <div id="${document.id}" title="${post.title}" content="${post.content}" style="display:block">
                   
                   <i class="delete material-icons red-text">delete</i>
                </div>   
           </div>
       </div>
       <div class="collapsible-body white">${post.content}</div>
       <li>
       `;
       html += li;

    });
    postList.innerHTML = html;

    const deleteIcons = document.querySelectorAll('.delete');
    deleteIcons.forEach(deleteIcon =>{
        deleteIcon.addEventListener('click', (e)=>{
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('id');
            fs.collection('posts').doc(id).delete();
        });
    });

  }else{
    if(user){
      postList.innerHTML = `<h4 class="center-align"> There are no posts<h4>`;
    }else{
      postList.innerHTML = `<h4 class="center-align"> Sign in to see orange posts</h4>`;
    }
}
};







//setup materializecss components
document.addEventListener('DOMContentLoaded', () => {

        const modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
      
        const items = document.querySelectorAll('.collapsible');
        M.Collapsible.init(items);
      
      });