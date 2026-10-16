import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartButton({ className = "" }) {
  const { count } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={`Cart, ${count} items`}
      className={`relative items-center justify-center rounded-lg p-2 text-2xl transition hover:bg-blue-50 ${className}`}
    >
      🛒
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export default CartButton;
