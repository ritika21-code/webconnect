import axios from 'axios';


const url = 'http://localhost:8000';

export const addUser = async (data) => {
  try {
    const response = await axios.post(`${url}/add`, data);
    return response; // Return the entire response object
  } catch (error) {
    console.log('Error while calling addUser API ', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const getusers = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    return response.data; // Return the entire response object
  } catch (error) {
    console.log('Error while calling getuser API ', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
export const setconversations = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/add`,data);
 
    return response; // Return the entire response object
  } catch (error) {
    console.log('Error while calling setconversation API ', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
export const getconversations = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/get`,data);
 
    return response.data; // Return the entire response object
  } catch (error) {
    console.log('Error while calling getconversation API ', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
export const newmessage = async (data) => {
  try {
    let response = await axios.post(`${url}/message/new`,data);
 
    return response.data; // Return the entire response object
  } catch (error) {
    console.log('Error while calling getconversation API ', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
export const getmessage = async (id) => {
   try {
        let response = await axios.get(`${url}/message/get/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
};
export const uploadfile = async (data) => {
  try {
      return await axios.post(`${url}/file/upload`, data);
  } catch (error) {
      console.log('Error while calling uploadfile API ', error);
      throw error; // Re-throw the error to be caught in the component
  }
};

