import React from 'react';
import PriceFilter from '../Filters/PriceFilter';

interface FilterProps {
    maxPriceFound: number,
    minPriceFound: number,
}

export default function Filters(props: FilterProps): JSX.Element {
    return (
        <div className="filters-panel">
            <PriceFilter maxPriceFound={props.maxPriceFound} minPriceFound={props.minPriceFound} />
        </div>
    );
}
