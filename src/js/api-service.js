import axios from "axios";
import getRefs from "./getRefs";

const refs = getRefs()


export default class ApiService {
    constructor (){
        this.q = '';
        this.page = 1;
    }   

     fetchImage() {
        // console.log(this)
        const options = {
        key: `30111501-80dfaf6bf0e872b32b653e61a`,
      
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: true
        };
        const BASE_URL = `https://pixabay.com/api/`
        let  {key, image_type, orientation} = options;
      
         return fetch(`${BASE_URL}?key=${key}&q=${this.q}&image_type=${image_type}&orientation=${orientation}&page=${this.page}&per_page=40`)
         .then(r => r.json())
         .then((data)=> {
           
            this.page += 1;
            const endImages = `<p class="info-end">
            <b>"We're sorry, but you've reached the end of search results."</b>
          </p>`
            if (data.totalHits/( this.page * 40) <= 1 && data.totalHits/( this.page * 40)> 0 && data.totalHits/( this.page * 40))  {
                refs.moreBtn.classList.add('is-hidden');  
                refs.imageGallery.insertAdjacentHTML("afterend", endImages)

            }
           
            return data;
         }); 
       
    }

     clearForm() {
        this.page = 1;
    }

    get searchQuery() {
        return this.q;
    }
    set searchQuery(newSearchQuery){
        this.q = newSearchQuery;
    }
    
};


 