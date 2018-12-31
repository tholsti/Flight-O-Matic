import * as React from 'react';

interface SetFilters {
    (e: any): boolean,
}

interface PriceProps {
    filters: {
        minPrice: number,
        maxPrice: number,
    },
    setFilters: SetFilters,
    minPriceFound: number,
    maxPriceFound: number,
}

type PriceState = {
    minPrice: number,
    maxPrice: number,
};

export default class PriceFilter extends React.Component<PriceProps, PriceState> {
    constructor(props: PriceProps) {
        super(props);
        this.state = {
            minPrice: this.props.minPriceFound,
            maxPrice: this.props.maxPriceFound,
        };
    }

    setMinPrice = (e: any) => {
        this.setState({
            minPrice: e.target.value,
        });
        this.props.setFilters({ 
            minPrice: e.target.value,
            maxPrice: this.state.maxPrice,
        });
    }

    setMaxPrice = (e: any) => {
        this.setState({
            maxPrice: e.target.value,
        });
        this.props.setFilters({
            minPrice: this.state.minPrice,
            maxPrice: e.target.value,
        });
    }

    render() {
        const { minPriceFound, maxPriceFound } = this.props;
        const { minPrice, maxPrice } = this.state;

        return (
            <div className="filter-container">
                <div className="filter-head">Filter by Price</div>

                <div className="text-center">Minimum price</div>
                <div className="filter-content d-flex">
                    <div className="price">{minPrice}</div>
                    <div className="align-items-center">
                        <input min={minPriceFound} max={maxPriceFound} value={minPrice} type="range" name="price-slider" id="price-slider" onChange={this.setMinPrice} />
                    </div>
                </div>

                <div className="text-center">Maximum price</div>
                <div className="filter-content d-flex">
                    <div className="price">{maxPrice}</div>
                    <div className="align-items-center">
                        <input min={minPriceFound} max={maxPriceFound} value={maxPrice} type="range" name="price-slider" id="price-slider" onChange={this.setMaxPrice} />

                    </div>
                </div>
            </div>
        );
    }
}
