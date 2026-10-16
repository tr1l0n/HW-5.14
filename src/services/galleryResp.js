import axios from "axios";
const API_key = "57983588-a53048f3c57a1f1e8ca69e633";
axios.defaults.baseURL = "https://pixabay.com/api";
export const fetchImages = async(query, page = 1) => {
    const response = await axios.get('/', {
        params: {
            key: API_key,
            q: query,
            image_type: "photo",
            per_page: 12,
            page
        },
    });
    
    return response.data;
}