import React from 'react';

const SearchBar = ({filterText, handleFilterText}) => {
	const handleChange = e => {
		handleFilterText(e.target.value);
	}
	return (
		<form>
			<input type="text" placeholder="Search for a currency" value={filterText} onChange={handleChange} />
		</form>
	)
}

export default SearchBar