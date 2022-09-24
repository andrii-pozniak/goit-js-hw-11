import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import getRefs from "./getRefs";
import ApiService from "./api-service";
import articleGallery from "./templates/article.hbs";


const refs = getRefs()

const apiService = new ApiService ();

refs.searchForm.addEventListener(`submit`, addRequest);
refs.moreBtn.addEventListener(`click`, onMoreAdd)

function addRequest(e) {

    e.preventDefault();

    apiService.q = e.currentTarget.elements.searchQuery.value;
    
    apiService.clearForm();
    apiService.fetchImage().then(addArticleImage);

}

function onMoreAdd(e) {
    e.preventDefault();
    apiService.fetchImage().then(addArticleImage);
};

function addArticleImage(hits) {
    // console.log(hits.views)
   const cart = hits.map(({webformatURL, tags, likes}) => {
      return `
      <div class="photo-card">
       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
       <div class="info">
         <p class="info-item">
           <b>Likes: ${likes}</b>
         </p>
         <p class="info-item">
           <b>Views: {views}</b>
         </p>
         <p class="info-item">
           <b>Comments: "{comments}"</b>
         </p>
         <p class="info-item">
           <b>Downloads: {downloads}</b>
         </p>
       </div>
     </div>`;
    }).join('');
    refs.imageGallery.insertAdjacentHTML("beforeend", addArticleImage(cart))
    // console.log(addArticleImage(cart))
}

function onError(error) {
    
}

