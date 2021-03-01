import React from "react";

const LocalSearch = ({ filter, setFilter }) => {
    const handleFilterChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value.toLowerCase());
    };
    return (
        <div className="containter pt-4 pb-4">
            <input
                type="search"
                placeholder="поиск"
                value={filter}
                onChange={handleFilterChange}
                className="form-control mb-4"
            />
        </div>
    );
};

export default LocalSearch;
