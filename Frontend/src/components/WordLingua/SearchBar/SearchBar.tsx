// src/components/Searchbar.jsx

import { useState } from "react";
import { Input } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'


const Searchbar = (props) => {

    // Call the jotaba API with the keyword that the user submitted
    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchWords(props.wordSearch);
    }

    // Show the Searchbox and search button
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input 
                type='text'
                name='searchs'
                placeholder='Search' 
                value = {props.wordSearch}
                onChange={(event) => props.setWordSearch(event.target.value)}
                />          
                <IconButton type='submit' aria-label='Search database' icon={<SearchIcon />}  />
            </form>   
        </>
    );
};

export default Searchbar;