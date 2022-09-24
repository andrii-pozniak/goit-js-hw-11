import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import getRefs from "./getRefs";
import ApiService from "./api-service";
import articleImage from "../templates/article.hbs"

let debounce = require('lodash.debounce');
const refs = getRefs()

const apiService = new ApiService ();

refs.searchForm.addEventListener(`submit`, addRequest);
refs.moreBtn.addEventListener(`click`, onMoreAdd)

function addRequest(e) {

    e.preventDefault();

    apiService.q = e.currentTarget.elements.searchQuery.value;
    
    apiService.clearForm();
    apiService.fetchImage().then(hit => {console.log(hit)});

}

function onMoreAdd(e) {
    e.preventDefault();
    apiService.fetchImage();
};

function onError(error) {
    
}

