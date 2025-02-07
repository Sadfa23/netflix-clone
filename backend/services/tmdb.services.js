import axios from "axios";
import ENV_VARS from "../config/envVars.js";

/*
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWM1MmQ5NTNlNWE2ZWY0NTk5YzE4NmEzMmFhZjBlZCIsIm5iZiI6MTczODYzMDYzMC4xMzMsInN1YiI6IjY3YTE2NWU2NmI2MDkxMThkMTI2NTJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sTjPV9euC1fzKgEnnveQl8ZhZKobYNhhme9lpHOJ3-M'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

*/
export const fetchFromTMDB = async(url)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ENV_VARS.TMDB_API_KEY
        }
    };
    const response = await axios.get(url,options);

    if (response.status !==200) {
        throw new Error('Failed to fetch from TMDB', + response.statusText);
    }

    return response.data
}