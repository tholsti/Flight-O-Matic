import React from 'react';
import PriceFilter from '../Filters/PriceFilter';

interface SetFilters {
    (e: any): boolean,
}

interface FilterProps {
    maxPriceFound: number,
    minPriceFound: number,
    setFilters: SetFilters,
    filters: {
        minPrice: number,
        maxPrice: number,
    },
}

export default function Filters(props: FilterProps): JSX.Element {
    return (
        <div className="filters-panel">
            <PriceFilter
                maxPriceFound={props.maxPriceFound} 
                minPriceFound={props.minPriceFound}
                setFilters={props.setFilters}
                filters={props.filters}
            />
        </div>
    );
}
