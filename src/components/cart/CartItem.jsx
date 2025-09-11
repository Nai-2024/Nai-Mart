
// CartItem Component - Child component 
// item, onIncrease, onDecrease, onRemove are the props that comes from parent component -ProductCart
// It renders img, decrease, increase, delete (buttons) and price.
export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {

  return (
  
    <div className="bg-gray-100 p-4 rounded shadow flex flex-col md:flex-row min-h-[220px]">
      {/* Product Image */}
      <div className="md:w-1/3 flex justify-center items-start mb-4 md:mb-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-w-[120px] h-auto object-contain rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-2/3 flex flex-col flex-1 pr-3">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-700 text-sm pt-2 flex-grow break-words">
          {item.description}
        </p>

        {/* Quantity + Price */}
        <div className="flex justify-between items-center pt-5 pb-1 md:mt-auto gap-2">
          <div className="flex items-center gap-2">
            {/* Decrease qty button */}
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-300 text-black rounded-full hover:bg-gray-400 transition cursor-pointer"
              onClick={onDecrease}
            >
              -
            </button>
            {/* Quantity with min*/}
            <span className="px-3 py-1">{item.quantity || 1}</span>
            {/* Increase qty button */}
            <button
              className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition cursor-pointer"
              onClick={onIncrease}
            >
              +
            </button>
          </div>

          <button
            className="bg-red-500 text-white px-5 rounded-full hover:bg-red-600 transition cursor-pointer"
            onClick={onRemove}
          >
            Delete
          </button>

          <span className="text-yellow-600 font-bold">
            ${(item.price * (item.quantity || 1)).toFixed(2)} {/*JS method -formats a number to have exactly 2 decimal places. - $5.00 */}
          </span>
        </div>
      </div>
    </div>
  );
}
