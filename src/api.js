import axios from 'axios';

axios.defaults.baseURL = 'http://api.thedogapi.com/v1';


export const fetchBreeds = async () => {
    const response = await axios.get('/breeds');
    console.log(response.data);
  return response.data;
};

export const fetchDogByBreed = async breedId=> {
  const response = await axios.get('/image/search', {
    params: { breed_id: breedId },
  });
    
  return response.data[0];
};
