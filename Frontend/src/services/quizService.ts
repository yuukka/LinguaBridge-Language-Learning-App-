const BACKEND_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/question`;

const getQuickQuiz = async (requestType) => {
    const token = localStorage.getItem('token');

    console.log(token);
    
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/random`, {
        method: requestType,
        headers: {
            "Content-Type": "application/json"
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
    getQuickQuiz,
};