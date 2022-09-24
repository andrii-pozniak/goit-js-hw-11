import axios from "axios";

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
            // console.log(`после`, this)
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

// options = {
    

// }
// const BASE_URL = `https://pixabay.com/api/`
// let  {key, q, image_type, orientation} = options;
// // let imageId = ``

// // console.log(imageId);
// async function fetchImage(q) {
//     const {data: {hits}} = await axios.get(`${BASE_URL},?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}`);
//     // console.log(hits);
   
//     return hits;
// // console.log(resp.json())
// // console.log(`${key}`)
// }

 