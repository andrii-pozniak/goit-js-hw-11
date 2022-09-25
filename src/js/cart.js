export default function onCarts({largeImageURL,
     webformatURL,
      tags, likes,
       views, 
       comments, 
       downloads}) {
    
        return `
        <div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
         <img class="gallery__img"src="${webformatURL}" alt="${tags}" loading="lazy" width "250"/>
         </a>
         <div class="info">
           <p class="info-item">
             <b>Like:<br> ${likes}</b>
           </p>
           <p class="info-item">
             <b>View: <br> ${views}</b>
           </p>
           <p class="info-item">
             <b>Comment: <br>${comments}</b>
           </p>
           <p class="info-item">
             <b>Download: <br>${downloads}</b>
           </p>
         </div>
       </div>`;
      }
