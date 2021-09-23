import axios from 'axios';

const KEY = 'AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM'; // mention your youtube API key here

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})
