
// const apiService = {
//     get: async function (url: string): Promise<any> {
//         console.log('get', url);
        
//         return new Promise((resolve, reject) => 
//         { 
//             fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json' 
//                 }
//             })
//             .then(response => response.json())
//             .then(json => {
//                 console.log('response', json);
//                 resolve(json);
//             })
//             .catch(error => {
//                 reject(error); 
//             });
//         });
//     },
    
//     post: async function(url: string,data:any): Promise<any>{
//         console.log('post',url,data);
//         return new Promise((resolve, reject) => { 
//             // fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//             fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//                 method: 'POST',
//                 body:data,
//                 headers: {
                    
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => response.json())
//             .then(json => {
//                 console.log('response', json);
//                 resolve(json);
//             })
//             .catch(error => {
//                 reject(error); 
//             });
//         });
//     },

    
// }

import axios from 'axios';

export const removeReservation = async (url, token) => {
  try {
    // Send DELETE request to delete the reservation
    const deleteUrl = `${process.env.NEXT_PUBLIC_API_HOST}/${url}`;
    console.log('DELETE', deleteUrl);
    const deleteResponse = await axios.delete(deleteUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Delete Response:', deleteResponse.data);
    return deleteResponse.data;
  } catch (error) {
    console.error('Error in delete request:', error);
    throw error;
  }
};

export const fetchListingDetail = async (url,token) => {
  const url2 = `${process.env.NEXT_PUBLIC_API_HOST}/${url}/`;
  console.log(url2)
  try {
    console.log('GET', url2);
    const response = await axios.get(url2, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
  
};

export const sendpodtdata = {
  post: async function(url:string, data:data, token:string) {
    try {
   
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  },
  put: async function(url: string, data: data, token: string) {
    try {

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        headers : headers
      });
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  }
  
};

export const profileApiservive={

  get: async function (url:string, token:string) {
    try {
      console.log('get', url);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  },

  post: async function(url:string, formData:FormData, token:string) {
    try {
      console.log('post', url, [...formData.entries()]);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  }
};



const apiService = {
  get: async function (url:string) {
    try {
      console.log('get', url);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  },
  
  post: async function(url: string, data:any) {
    try {
      console.log('post', url, data);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in POST request:', error);
      // throw error;
    }
  },
  put: async function(url: string, data: FormData, token: string) {
    try {
      console.log('put', url, [...data.entries()]);

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };
      console.log('Headers:', headers); // Log headers
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'multipart/form-data'
        // }
        headers : headers
      });
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  }
};


export default apiService;
