var dateFormat = require('dateformat');
//const settings = {url: 'https://newsapi.org/v2/everything?', key: 'bf7169dab96c48ad8d40d898b911863c'};
const settings = {url: 'https://nomoreparties.co/news/v2/everything?', key: 'bf7169dab96c48ad8d40d898b911863c'};

class NewsApi {
    constructor(settings) {
        this.baseUrl = settings.url;
        this.key = settings.key;
    }
    getNews(query, dateNow) {
        const formattedDateNow = dateFormat(dateNow, "yyyy-mm-dd"); 
        const dateWeekAgo = dateNow.setDate(dateNow.getDate() - 7);
        const formattedDateWeekAgo = dateFormat(dateWeekAgo, "yyyy-mm-dd")
        return fetch(`${this.baseUrl}q=${query}&from=${formattedDateWeekAgo}&to=${formattedDateNow}&sortBy=popularity&pageSize=100&language=ru&apiKey=${this.key}`, {
          method: 'GET'
        })
          .then((result) => {
            if (result.ok) {
              return result.json();
            }
            return Promise.reject(`error${result.status}`);
          })
          .catch((err) => console.log(err));
      }

}

const newsApi = new NewsApi(settings); 
export default newsApi;