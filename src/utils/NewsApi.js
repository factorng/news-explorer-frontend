import { NEWS_API_KEY, NEWS_API_URL, DAYS_TO_SEARCH } from "../utils/constants";

//const settings = {url: 'https://newsapi.org/v2/everything?', key: 'bf7169dab96c48ad8d40d898b911863c'};
class NewsApi {
  constructor(settings) {
    this.baseUrl = settings.url;
    this.key = settings.key;
  }
  getNews(query, date) {
    const dateNow = date.toISOString().slice(0, 10);
    date.setDate(date.getDate() - DAYS_TO_SEARCH);
    const dateWeekAgo = date.toISOString().slice(0, 10);

    return fetch(
      `${this.baseUrl}q=${query}&from=${dateWeekAgo}&to=${dateNow}&sortBy=popularity&pageSize=100&language=ru&apiKey=${this.key}`,
      {
        method: "GET",
      }
    )
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`error${result.status}`);
      })
      .catch((err) => console.log(err));
  }
}

const newsApi = new NewsApi({ url: NEWS_API_URL, key: NEWS_API_KEY });
export default newsApi;
