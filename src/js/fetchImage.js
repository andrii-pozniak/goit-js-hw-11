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

}

function onMoreAdd(e) {
    e.preventDefault();
    

    apiService.fetchImage().then(addArticleImage);
};

function cleanView() {
  refs.imageGallery.innerHTML = ``;
};
function addArticleImage(hits) {
    console.log(hits)
   const cart = hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
      return `
      <div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}">
       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
       </a>
       <div class="info">
         <p class="info-item">
           <b>Like: ${likes}</b>
         </p>
         <p class="info-item">
           <b>View: ${views}</b>
         </p>
         <p class="info-item">
           <b>Comment: ${comments}</b>
         </p>
         <p class="info-item">
           <b>Download: ${downloads}</b>
         </p>
       </div>
     </div>`;
    }).join("");
    refs.imageGallery.insertAdjacentHTML("beforeend", cart)
    // console.log(addArticleImage(cart))
}
const light = new SimpleLightbox(`.photo-card a`, { captionsData: 'alt',captionDelay: 250,});

// light();
function onError(error) {
    
}

