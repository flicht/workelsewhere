const deconstructScores = (categories) => {
  let output = [];
  categories.map((s) => {
    if (selectedCategories.includes(s.name)) {
      output.push({
        name: s.name,
        score: String(s.score_out_of_10.toFixed(1)),
      });
    }
  });
  return output;
};

const deconstructWeather = (weather) => {
    const outputWeather = {}

    weather.map(w => {
        const valueAccess = w.type + '_value'
        outputWeather[w.id] = w[valueAccess]}
         )

    return outputWeather
}

const deconstructPrices = (prices) => {
    const outputPrices = {}

    prices.map(item => {
        const valueAccess = item.type + '_value'
        outputPrices[item.id] = item[valueAccess]}
         )

    return outputPrices
}

const urlToSlug = (url, pos=2) => {

    if (url) {    
        const parts = url.split("/")
        const el = parts[parts.length - pos]
        const result = el.replace("slug:", "")
        
        return result
    }
}



const condenseUrbanArea = (details) => {
  const cityDetails = {};

  cityDetails.full_name = details.full_name;
  cityDetails.name = details.name;
  cityDetails.slug = details.slug;
  cityDetails.mayor = details.mayor;
  cityDetails.summary = details._embedded["ua:scores"].summary;
  cityDetails.workelsewhereScore =
    details._embedded["ua:scores"].teleport_city_score;
  cityDetails.continent = details.continent;
  cityDetails.image = details._embedded["ua:images"].photos[0].image;
  cityDetails.scores = deconstructScores(details._embedded["ua:scores"].categories);
  cityDetails.weather = deconstructWeather(details._embedded["ua:details"].categories[2].data);
  cityDetails.consumerPrices = 
    deconstructPrices(details._embedded["ua:details"].categories[3].data);

  return cityDetails;
};

const selectedCategories = [
  "Safety",
  "Cost of Living",
  "Internet Access",
  "Leisure & Culture",
  "Toleranace",
  "Outdoors",
  "Environmental Quality",
  "Business Freedom",
];


export { condenseUrbanArea, deconstructScores, urlToSlug };
