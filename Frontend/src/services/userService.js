// src/services/userService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;


const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Token}` },
    //   body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data) {
      return data;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};



export {
  index
};

