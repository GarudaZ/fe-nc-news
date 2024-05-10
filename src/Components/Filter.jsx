const Filter = ({ setSortBy, setOrder, handleUrl }) => {
	function handleSortSelect(e) {
		e.preventDefault();
		const sortType = e.target.value;
		setSortBy(sortType);
	}

	function handleOrderSelect(e) {
		e.preventDefault();
		const orderType = e.target.value;
		setOrder(orderType);
	}

	return (
		<div>
			Filter
			<select onChange={handleSortSelect}>
				<option value="">Sort</option>
				<option value="comment_count">Comments</option>
				<option value="votes">Votes</option>
				<option value="created_at">Date</option>
			</select>
			<select onChange={handleOrderSelect}>
				<option value="">Order</option>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>
			<button onClick={handleUrl}>Show</button>
		</div>
	);
};

export default Filter;
