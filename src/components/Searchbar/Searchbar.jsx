import { useState } from 'react';

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    onSubmit(value);
  };

  const changeHandler = e => {
    const targetValue = e.target.value;
    setValue(targetValue);
  };

  return (
    <header className="searchBar">
    <div className="logoji">iGallery</div>
    
      <form className="form" onSubmit={submitHandler}>
        <button type="submit" className="button">
          <span className="buttonLabel">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search any images"
          onChange={changeHandler}
        />
      </form>
      <div><a className="abouta" href="/">Know More</a></div>
    </header>
  );
}

export default SearchBar;
