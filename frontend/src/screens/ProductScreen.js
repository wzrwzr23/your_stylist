import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
// import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import "./screen.css"

function ProductScreen(props) {
  // const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [opp, setOpp] = useState();
  // const [oppnull, setOppnull] = useState(false);
  const [str, setStr] = useState("");

  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(async () => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));

    return () => {

    };
  }, [productSaveSuccess]);

  const wait = async () => {
    setOpp(product.optionn);
  }
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //
  //   dispatch(
  //     saveProductReview(props.match.params.id, {
  //       name: userInfo.name,
  //       rating: rating,
  //       comment: comment,
  //     })
  //   );
  // };
  const show = ()=>{
    console.log(product.optionn);
    console.log(1);
    if (product.optionn != null) {
      if (!opp) {
        setOpp(true);
      } else {
        setOpp(false);
      }
    }else{
      setOpp(false);
      setStr("No options.");
    }
  }
  const handleAddToCart = () => {

    props.history.push('/wishlist/' + props.match.params.id + '?qty=' + 1);
  };




  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                {/* <li> */}
                {/*   <a href="#reviews"> */}
                {/*     <Rating */}
                {/*       value={product.rating} */}
                {/*       text={product.numReviews + ' reviews'} */}
                {/*     /> */}
                {/*   </a> */}
                {/* </li> */}
                <li>
                  Price: <b>{product.minprice}{product.currency} ~ {product.maxprice}{product.currency}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
                <li>
                  <a href={product.addr} className="link">Purchase Now</a>
                </li>
              </ul>
            </div>

          </div>
          <div>
            <button
              onClick={handleAddToCart}
              className="bu"
            >
              Add to wishlist
            </button>
            <button className="bu" onClick={show}>Show options</button>
            {
              opp ?  (
                <div >
                  {
                    product.optionn.map((item) => {
                      return(
                        <div className='list-item'>
                          <p>Option: {item.name}</p>

                          <p>Price: {item.price}</p>

                          <p>Quantity: {item.quantity}</p>

                        </div>
                      )
                    })
                  }
                </div>
              ):(
                <p>{str}</p>
              )
            }
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
