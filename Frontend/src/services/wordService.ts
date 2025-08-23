const BACKEND_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/word`;

const saveWord = async (requestType, requestBody, recordID) => {
    const token = localStorage.getItem('token');

    console.log(token);
    const requestPayload = JSON.stringify(requestBody);
    
    let url = '';

    if (requestType === "DELETE" && recordID !== null) {
        url = `${BACKEND_BASE_URL}/${recordID}`;
    }
    else if (requestType === "PATCH" && recordID !== null) {
        url = `${BACKEND_BASE_URL}/${recordID}`;
    } else {
        url = `${BACKEND_BASE_URL}`
    }

    console.log(url);

    try {
        const response = await fetch(url, {
        method: requestType,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: requestPayload
        
        });
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        
        return json;
    } catch (error) {
        console.error(error.message);
         throw error;
    }

};


const getWord = async (requestType, recordID) => {
    const token = localStorage.getItem('token');

    console.log(token);
    
    try {
        const response = await fetch(BACKEND_BASE_URL, {
        method: requestType,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
        
        });
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        
        return json;
    } catch (error) {
        console.error(error.message);
         throw error;
    }

};

const removeWord = async (requestType, recordID) => {
    const token = localStorage.getItem('token');

    console.log(token);
    console.log(recordID);
    const url = `${BACKEND_BASE_URL}/${recordID}`;
    console.log(url);
    try {
        const response = await fetch(url, {
        method: requestType,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
        
        });
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        
        return json;
    } catch (error) {
        console.error(error.message);
         throw error;
    }

};

export { 
    saveWord,
    getWord,
    removeWord,
};