import ProductCard from "./ProductCard";

function AccessoryCard({ item, onOpen }) {
  return <ProductCard kind="accessory" item={item} onOpen={onOpen} />;
}

export default AccessoryCard;
