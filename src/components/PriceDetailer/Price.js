export const PriceComponent = ({ actualPrice, discountPrice }) => {
    // Calculate the discount percentage
    const discountPercent = Math.round(((actualPrice - discountPrice) / actualPrice) * 100);

    return (
        <div className="flex flex-col space-y-1">
            {/* Discounted Price */}
            <div className="flex items-center">
                <span className="text-md">₹</span><span className="text-xl font-bold">{discountPrice}</span>
                <span className="ml-2 text-sm font-medium text-gray-500">({discountPercent}% off)</span>
                <span className="text-xs ml-2 text-gray-500 font-semibold">onwards</span>
            </div>

            {/* Actual Price */}
            <div className="flex items-center space-x-2">
                <span className="text-md font-medium text-gray-500 line-through">M.R.P: ₹{actualPrice}</span>
                <span className="text-red-500 text-xs">Inclusive of all taxes</span>
            </div>
        </div>
    );
};