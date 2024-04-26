import { LightningElement } from 'lwc';
const DELAY = 300;

export default class MovieDetail extends LightningElement {
    selectedType = "";
    selectedSearch = "";
    loading = false;
    selectedPageNo = "1";
    delayTimeout;
    searchResult = [];
    

    get typeoptions() {
        return [
            { label: "None", value: "" },
            { label: "Movie", value: "movie" },
            { label: "Series", value: "series" },
            { label: "Episode", value: "episode" },
        ];
    }

    handleChange(event){

        let {name, value} = event.target;
        this.loading = true;
        if(name === "Type"){
            this.selectedType = value;

        }else if(name === "search"){
            this.selectedSearch = value;

        }else if(name === "pageno"){
            this.selectedPageNo = value;
        }
        //debouncing
        clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.searchMovie();
        }, DELAY);
      

    }
    //this method will search for the entered movies
    async searchMovie(){
        //const URL =  https://www.omdbapi.com/?s==2
        const url  = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&type=${this.selectedPageNo}&apikey= f6762bfe`;
        const res = await fetch(url);
        const data = await res.json();
        console.log = ("Movie Search Output", data);
        this.loading = false;
        if(data.Response === "True"){
            this.searchResult = data.Search;
        }
       }
   

    }

