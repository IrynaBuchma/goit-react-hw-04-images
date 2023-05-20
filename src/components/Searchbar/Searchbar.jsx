import { useState } from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import Notiflix from 'notiflix';

const Searchbar= ({ onSubmit }) => {

    const [inputData, setInputData] = useState ('');

    const onInputChange = e => {
        setInputData(e.currentTarget.value.toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(inputData.trim() === '') {
            Notiflix.Notify.failure('Please input request data');
            return;
          } 
        onSubmit(inputData);
        setInputData('');
    }
        
        return (
            <header className={css.searchbar}>
                <form className={css.searchform} onSubmit={handleSubmit}>
                    
                    <input
                        className={css.searchform__input}
                        name="inputData"
                        value={inputData}
                        onChange={onInputChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />

                    <button type="submit" className={css.searchform__btn}>
                        <FaSearch size={25} fill="blue"/>
                        <span className={css.searchform__btnLabel}>Search</span>
                    </button>
                </form>
            </header>
        )
    }

Searchbar.propTypes = {
 inputData: PropTypes.string,
 onInputChange: PropTypes.func,
 onSearch: PropTypes.func,
}

export default Searchbar;