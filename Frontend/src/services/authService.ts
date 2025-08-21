// src/services/authService.ts

// Use the `VITE_BACK_END_SERVER_URL` environment variable to set the base URL.
// Note the `/auth` path added to the server URL that forms the base URL for
// all the requests in this service.
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

// interface AuthResponse {
//   token?: string;
//   err?: string;
//   [key: string]: any; 
// }

interface Credentials {
  username: string;
  password: string;
}

const signIn = async (formData: Credentials): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data: any = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) throw err;
    throw new Error('Unknown error occurred');
  }
};

const signUp = async (formData: Credentials): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) throw err;
    throw new Error('Unknown error occurred');

    // throw new Error(err);
  }
};

export {
  signUp,
  signIn
};

