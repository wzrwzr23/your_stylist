import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import "./screen.css"

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [opp, setOpp] = useState();
  const [oppnull, setOppnull] = useState(false);
  const [str, setStr] = useState("");

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
    // console.log(product.optionn);
    // product.option.map((item)=>{
    //   console.log(item);
    //   }
    //
    // )
    props.history.push('/wishlist/' + props.match.params.id + '?qty=' + 1);
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
                <li>
                  <a href={product.addr} className="link">Purchase Now</a>
                </li>
              </ul>
            </div>
            {/* <div className="details-action"> */}
            {/*   /!* <div> *!/ */}
            {/*   /!*   {product.option.map(item => <div>{item.name}</div>)} *!/ */}
            {/*   /!* </div> *!/ */}
            {/*   /!* <button onClick={handleAddToCart}>hhh</button> *!/ */}
            {/*   <ul> */}

            {/*     /!* {product.optionn.map(item => <div>{item.name}</div>)} *!/ */}
            {/*     /!* <p>{product.optionn[0].name}</p> *!/ */}
            {/*     <li>Price: {product.minprice}{product.currency} ~ {product.maxprice}{product.currency}</li> */}
            {/*     <li>Currency: {product.currency}</li> */}
            {/*     <li> */}
            {/*       Status:{' '} */}
            {/*       {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'} */}
            {/*     </li> */}
            {/*     <li> */}
            {/*       Qty:{' '} */}
            {/*       <select */}
            {/*         value={qty} */}
            {/*         onChange={(e) => { */}
            {/*           setQty(e.target.value); */}
            {/*         }} */}
            {/*       > */}
            {/*         {[...Array(product.countInStock).keys()].map((x) => ( */}
            {/*           <option key={x + 1} value={x + 1}> */}
            {/*             {x + 1} */}
            {/*           </option> */}
            {/*         ))} */}


            {/*       </select> */}
            {/*     </li> */}
            {/*     <li> */}
            {/*       {product.countInStock > 0 && ( */}
            {/*         <button */}
            {/*           onClick={handleAddToCart} */}
            {/*           className="button_a" */}
            {/*         > */}
            {/*           Add to wishlist */}
            {/*         </button> */}
            {/*       )} */}
            {/*     </li> */}

            {/*   </ul> */}
            {/* </div> */}
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
                          {/* <br></br> */}
                          <p>Price: {item.price}</p>
                          {/* <br></br> */}
                          <p>Quantity: {item.quantity}</p>
                          {/* <br></br> */}
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
