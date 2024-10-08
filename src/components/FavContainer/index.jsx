import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserFav,
  deleteUserFav,
  getAllFavs,
} from "../../redux/actions/favoritos";
import { Div, FavOff, FavOn } from "./styles";
import { toast } from "react-toastify";
import ToastMsg from "../Toast";
import { useLocation } from "react-router-dom";

export default function FavIcon({ productId, productName }) {
  const [favStatus, setFavStatus] = useState(false);
  const favs = useSelector((state) => state.favorites);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleChange = () => {
    // let userId=favs.userId;
    if (!favStatus) {
      setFavStatus((status) => !status);
      // añadido:
      dispatch(createUserFav(userId, productId));
      toast.success(`${productName} añadido a favoritos`);
    } else {
      let detail = location.pathname.split("/")[1];
      if (location.pathname === "/" || detail === "detail") {
        setFavStatus(false);
        dispatch(deleteUserFav(userId, productId));
        toast.error(`${productName} eliminado de favoritos`);
      } else {
        toast.error(
          <ToastMsg
            tipo={"fav"}
            name={productName}
            userId={userId}
            productId={productId}
            setFavStatus={setFavStatus}
          />,
          {
            toastId: `delete${productId}`,
          }
        );
      }
    }
  };
  useEffect(() => {
    if (favs.userFavorites.includes(productId)) setFavStatus(true);
  }, [favs.userFavorites]);
  return (
    <Div>
      {favStatus ? (
        <FavOn onClick={handleChange} />
      ) : (
        <FavOff onClick={handleChange} />
      )}
    </Div>
  );
}
