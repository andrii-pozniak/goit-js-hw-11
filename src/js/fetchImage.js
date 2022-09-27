import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import getRefs from "./getRefs";
import ApiService from "./api-service";
import articleGallery from "./article.hbs";
import onCarts from "./cart";

const refs = getRefs()

const apiService = new ApiService ();

refs.searchForm.addEventListener(`submit`, addRequest);
refs.moreBtn.addEventListener(`click`, onMoreAdd)

function addRequest(e) {

    e.preventDefault();    

    apiService.q = e.currentTarget.elements.searchQuery.value;
    cleanView();
    apiService.clearForm();
    apiService.forEnd();
    apiService.fetchImage().then(data => {
      addArticleImage(data);
      console.log('OK', apiService.q)
      if (data.totalHits === 0) {
        refs.searchForm.reset();
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       return;
      } 
      Notiflix.Notify.success(`"Hooray! We found ${data.totalHits} images."`); 
      refs.moreBtn.classList.remove('is-hidden');
    });
    
}

refs.moreBtn.classList.add('is-hidden');

function onMoreAdd(e) {
    e.preventDefault();    
    
    apiService.fetchImage().then(data => {
      addArticleImage(data)
     
    });
      
};

// function scrollImage (e) {
//   const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect().y <= -580 || null;

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
// console.log()
// }

function cleanView() {

  refs.imageGallery.innerHTML = ``; 
  
};

function addArticleImage(data) { 
 
   const cart = data.hits.map(hit => onCarts(hit)).join("");
    refs.imageGallery.insertAdjacentHTML("beforeend", cart)
    const light = new SimpleLightbox(`.photo-card a`, { captionsData: 'alt',captionDelay: 250,});
   
   
    
}

