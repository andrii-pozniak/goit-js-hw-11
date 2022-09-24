import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import getRefs from "./getRefs";
import ApiService from "./api-service";
import articleGallery from "./article.hbs";


const refs = getRefs()

const apiService = new ApiService ();

refs.searchForm.addEventListener(`submit`, addRequest);
refs.moreBtn.addEventListener(`click`, onMoreAdd)
refs.submitBtn.disabled = false;
    refs.moreBtn.disabled = true;
function addRequest(e) {

    e.preventDefault();
    refs.submitBtn.disabled = false;
    refs.moreBtn.disabled = false;

    apiService.q = e.currentTarget.elements.searchQuery.value;
    cleanView();
    apiService.clearForm();
    apiService.fetchImage().then(addArticleImage);

    Notiflix.Notify.success('`We found ${hits.} Please enter a more specific name.`');

}

function onMoreAdd(e) {
    e.preventDefault();
    

    apiService.fetchImage().then(addArticleImage);
};

function cleanView() {
  refs.imageGallery.innerHTML = ``;
};
function addArticleImage(data) {
    
   const cart = data.hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
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
    }).join("");
    refs.imageGallery.insertAdjacentHTML("beforeend", cart)
    const light = new SimpleLightbox(`.photo-card a`, { captionsData: 'alt',captionDelay: 250,});

    console.log(data.totalHits)
    // console.log(addArticleImage(cart))
}
// const light = new SimpleLightbox(`.photo-card a`, { captionsData: 'alt',captionDelay: 250,});

// light();

function onError(error) {
    
}

