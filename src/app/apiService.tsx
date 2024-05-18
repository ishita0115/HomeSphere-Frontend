
import axios from 'axios';

export const removeReservation = async (url: string, token: any) => {
  try {
    // Send DELETE request to delete the reservation
    const deleteUrl = `${process.env.NEXT_PUBLIC_API_HOST}/${url}`;
    const deleteResponse = await axios.delete(deleteUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return deleteResponse.data;
  } catch (error) {
    console.error('Error in delete request:', error);
    throw error;
  }
};

export const fetchListingDetail = async (url: string,token: any) => {
  const url2 = `${process.env.NEXT_PUBLIC_API_HOST}/${url}/`;
  try {
    console.log('GET', url2);
    const response = await axios.get(url2, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      
    });
    return response.data;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
  
};

export const sendpodtdata = {
  post: async function(url:string, data:any, token:string) {
    try {
   
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  },
  put: async function(url: string, data: any, token: string) {
    try {

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        headers : headers
      });
      return response.data;
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  }
  
};
export const paginationdatafetch={
  get: async function (url: string, token: string, params?: object) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        params, 
      };
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}

export const profileApiservive={

  get: async function (url:string, token:string) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async function(url:string, formData:FormData, token:string) {
    
      // console.log('post', url, [...formData.entries()]);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
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
      return response.data;
    } catch (error) {
      console.error('Error in GET request:', error);
      // throw error;
    }
  },
  
  post: async function(url: string, data:any) {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
  },
  put: async function(url: string, data: FormData, token: string) {
      // console.log('put', url, [...data.entries()]);
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, data, {
        headers : headers
      });
      return response.data;
  }
};


export default apiService;
