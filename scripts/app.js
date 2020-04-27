const postList = document.querySelector('.posts');

const setupPosts = (data) =>{

    let html =``;
    data.forEach( document =>{

       const post = document.data();
       const li = `
       <li>
           <div class="collapsible-header grey lighten-4">${post.application}</div>
           <div class="collapsible-body white">${post.details}</div>
       <li>
       `;
       html += li;

    });
    postList.innerHTML = html
}







//setup materializecss components
document.addEventListener('DOMContentLoaded', () => {

        const modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
      
        const items = document.querySelectorAll('.collapsible');
        M.Collapsible.init(items);
      
      });