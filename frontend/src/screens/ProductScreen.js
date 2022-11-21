import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
// import "./screen.scss"

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [opp, setOpp] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  // const options = product.option;
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
    // setOpp(product.option)
    // await wait();
    // while (loading | error){
    //   console.log(1);
    //   console.log(product.name);
    // }
    // console.log(2);
    // console.log(product.name);
    // console.log("success");
    return () => {
      //
    };
  }, [productSaveSuccess]);

  const wait = async () => {
    setOpp(product.optionn);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const show = ()=>{
    console.log(product.optionn);
    console.log(1);
    setOpp(true);
  }
  const handleAddToCart = () => {
    console.log(product.optionn);
    // product.option.map((item)=>{
    //   console.log(item);
    //   }
    //
    // )
    // // props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  // const jump = () => {
  //   window.location='http://www.baidu.com'
  // }



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
            <button onClick={show}>Show options</button>
            {opp ?  (
              <div>
                {product.optionn.map(item =>
                  <div>{item.name}</div>
                )}
              </div>
            ):(
              <p>loading</p>
            )}
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  Price: <b>{product.minprice}{product.currency} ~ {product.maxprice}{product.currency}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              {/* <div> */}
              {/*   {product.option.map(item => <div>{item.name}</div>)} */}
              {/* </div> */}
              <button onClick={handleAddToCart}>hhh</button>
              <ul>

                {/* {product.optionn.map(item => <div>{item.name}</div>)} */}
                {/* <p>{product.optionn[0].name}</p> */}
                <li>Price: {product.minprice}{product.currency} ~ {product.maxprice}{product.currency}</li>
                <li>Currency: {product.currency}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}


                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button_a"
                    >
                      Add to wishlist
                    </button>
                  )}
                </li>
                <li>
                  <a href="http://www.baidu.com" className="button_a">Purchase Now</a>
                  {/* <li> */}
                  {/*   <button onClick={jump} className="button_a">Purchase Now</button> */}
                  {/* </li> */}
                </li>
              </ul>
            </div>
          </div>
          {/* <input type="button" value="注册" onClick="window.location.href='http://www.php.cn'"></input> */}
          {/* <button onClick="window.open('http://www.php.cn')" */}
          {/*         className="button button-block bg-main size-big h60 margin-top-large">登录 */}
          {/* </button> */}

          {/* <p>aaa: {product.option}</p> */}


          {/* <div className="content-margined"> */}
          {/*   <h2>Reviews</h2> */}
          {/*   {!product.reviews.length && <div>There is no review</div>} */}
          {/*   <ul className="review" id="reviews"> */}
          {/*     {product.reviews.map((review) => ( */}
          {/*       <li key={review._id}> */}
          {/*         <div>{review.name}</div> */}
          {/*         <div> */}
          {/*           <Rating value={review.rating}></Rating> */}
          {/*         </div> */}
          {/*         <div>{review.createdAt.substring(0, 10)}</div> */}
          {/*         <div>{review.comment}</div> */}
          {/*       </li> */}
          {/*     ))} */}
          {/*     <li> */}
          {/*       <h3>Write a customer review</h3> */}
          {/*       {userInfo ? ( */}
          {/*         <form onSubmit={submitHandler}> */}
          {/*           <ul className="form-container"> */}
          {/*             <li> */}
          {/*               <label htmlFor="rating">Rating</label> */}
          {/*               <select */}
          {/*                 name="rating" */}
          {/*                 id="rating" */}
          {/*                 value={rating} */}
          {/*                 onChange={(e) => setRating(e.target.value)} */}
          {/*               > */}
          {/*                 <option value="1">1- Poor</option> */}
          {/*                 <option value="2">2- Fair</option> */}
          {/*                 <option value="3">3- Good</option> */}
          {/*                 <option value="4">4- Very Good</option> */}
          {/*                 <option value="5">5- Excelent</option> */}
          {/*               </select> */}
          {/*             </li> */}
          {/*             <li> */}
          {/*               <label htmlFor="comment">Comment</label> */}
          {/*               <textarea */}
          {/*                 name="comment" */}
          {/*                 value={comment} */}
          {/*                 onChange={(e) => setComment(e.target.value)} */}
          {/*               ></textarea> */}
          {/*             </li> */}
          {/*             <li> */}
          {/*               <button type="submit" className="button primary"> */}
          {/*                 Submit */}
          {/*               </button> */}
          {/*             </li> */}
          {/*           </ul> */}
          {/*         </form> */}
          {/*       ) : ( */}
          {/*         <div> */}
          {/*           Please <Link to="/signin">Sign-in</Link> to write a review. */}
          {/*         </div> */}
          {/*       )} */}
          {/*     </li> */}
          {/*   </ul> */}
          {/* </div> */}
        </>
      )}
    </div>
  );
}
export default ProductScreen;
