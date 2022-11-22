import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts, saveProduct } from '../actions/productActions';

import Rompers from './data/Rompers';
import SleevelessDress from "./data/SleevelessDress"
import PantsCapris from './data/PantsCapris';
import Tshirt from "./data/Tshirt";
import Blouse from "./data/Blouse";
import Cardigans from "./data/Cardigans";
import Hoodies from "./data/Hoodies";
import Skirt from "./data/Skirt";
import Jeans from "./data/Jeans";
import Jump from "./data/Jump";



function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [id, setId] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(listProducts(category));

    return () => {

    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const upload = () => {


    const totaldata = [SleevelessDress, PantsCapris, Rompers, Tshirt,Blouse,Cardigans,Hoodies,Skirt,Jeans,Jump]
    const totaldataname = ['SleevelessDress', 'PantsCapris', 'Rompers', 'Tshirt','Blouse','Cardigans','Hoodies','Skirt','Jeans','Jump']
        

    for (let c = 0;c<totaldata.length;c++){

      const testdata=totaldata[c];
      for (let i=0;i<testdata.length;i++){
        let d = testdata[i];
        let des = "";
        if (d["description"].length != 0){
          for (let j=0;j<d["description"].length;j++){
            des=des+d["description"][j]
          }
        }else{
          des = "no description"
        }
        if (d["option"]==null){
          continue;
        }
        if (d["img"]==[] | null){
          continue;
        }
        dispatch(
          saveProduct({
            _id: id,
            name: d['name'],
            minprice: parseInt(d["min_price"]),
            maxprice: parseInt(d["max_price"]),
            image: d["img"][0],
            brand: "no",
            category:totaldataname[c],
            countInStock:1,
            description: des,
            currency: d["min_currency"],
            optionn: d["option"],
            addr: d["addr"]
          })
        );
      }

    };
  }

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
            <button onClick = {upload}>Upload Products</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>

                <div className="product-price">From {product.minprice}{product.currency}</div>

              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
