const GIF_API_KEY = `${import.meta.env.VITE_GIF_API_KEY}`;

const gifSearch = async (searchImage) => {
    
    const searchImageString = JSON.stringify(searchImage)
    const url =  `https://api.giphy.com/v1/gifs/search?api_key=${GIF_API_KEY}&q=${searchImage}&limit=1`;

    try {
        const response = await fetch(url, {
        method: "GET",
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
    }
};

export { gifSearch };