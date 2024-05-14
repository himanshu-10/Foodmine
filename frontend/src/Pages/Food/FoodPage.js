import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
// import {  ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { getById } from "../../services/foodService";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import Price from "../../components/Price/Price";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../components/NotFound/NotFound";
export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const {addToCart} = useCart();
  const navigate = useNavigate()

  const handleAddToCart = () =>{
    // addToCart(food);
    // alert("Added to cart");
    // navigate('/cart');
    addToCart(food);
    // const notify = () => toast("Wow so easy!");
    navigate('/cart');

  }

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);

  return (
    <>
      
      {!food ? (<NotFound message= "Food Not Found!" 
        linkText="Back To HomePage"
      />) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`/foods/${food.imageUrl}`}
            alt={food.name}
          />

            {/* HEART ICON  */}
          <div className={classes.details}>
            <div className={classes.header}>
              <span>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>

            {/* STAR RATING */}
            <div classname={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

                {/* ORIGIN OF FOOD  */}
            <div className={classes.origin}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

              {/* TAGS FOR THE FOOD */}
            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

              {/* TIME TO COOK  */}
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

              {/* PRICE */}
            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button
              onClick={handleAddToCart}
             
            > Add to Cart</button>
           

          </div>
        </div>
      )}
    </>
  );
}
