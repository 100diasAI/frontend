import ShoppingCart from "../../containers/CartContainer";

export default function Cart({theme}) {
  document.title = "Shopping Online - Carrito";
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  return (
    <div style={{ paddingTop: "2rem", minHeight: "70vh" }}>
      <ShoppingCart theme={theme} />
    </div>
  );
}
