import axios from 'axios';

// defining my youtube API key here
const KEY = 'AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM'; 

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 6,
        key: KEY
    }
})
