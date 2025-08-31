const BACKEND_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/badge`;

const getBadge = async (requestType, level) => {
    const token = localStorage.getItem('token');

    console.log(token);
    
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/${level}`, {
        method: requestType,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
    getBadge,
};