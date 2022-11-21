import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, saveProduct } from '../actions/productActions';
import Rating from '../components/Rating';
// import testdata from './localdata.js';

// const da = [{
//   "name": "ZGCINE ZG-V160 V 마운트 배터리 V-잠금 리튬 배터리 유형-C USB 마이크로 포켓 배터리 카메라 스마트 폰 노트북",
//   "addr": "https://www.aliexpress.com/item/1005004946670054.html",
//   "min_price": 234473,
//   "min_currency": "KRW",
//   "max_price": 234473,
//   "max_currency": "KRW",
//   "option": null,
//   "img": [
//     "https://ae01.alicdn.com/kf/S6a34b98f866f43828f20967e912a4d9cz.jpg_640x640q90.jpg"
//   ],
//   "description": []
// }]

const data = [{'name': '여성 재킷, 패션 트위드 체크 블레이저 코트, 빈티지 긴 소매 포켓 여성 겉옷, 세련된 재킷, 여성 재킷', 'addr': 'https://www.aliexpress.com/item/1005004424678841.html', 'min_price': 34042.0, 'min_currency': 'KRW', 'max_price': 38056.0, 'max_currency': 'KRW', 'option': [{'name': '색상:Gray;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Blue;크기:Xs', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:Xs', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Multi;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 295}, {'name': '색상:Blue;크기:S', 'price': 77560.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Green;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Gray;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 288}, {'name': '색상:Red;크기:S', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Blue;크기:M', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:M', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': ' 색상:Multi;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 292}, {'name': '색상:Blue;크기:L', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Light Green;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 297}, {'name': '색상:Green;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 289}, {'name': '색상:Red;크기:L', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색 상:Light Green;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}], 'img': ['https://ae01.alicdn.com/kf/S8d40b54a080f4dd4a45c18a1c71a1408j.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Hd1f34768a6044da0826df27b9898d4dar.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sb3320276fb374b97be0f5161534daca2d.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sa6bd260a29654e0a84942bc372cb6df3k.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S77fbff7d268e44379a1c5786f74f8a62e.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S949b7516f58e4b738495e392b04cf09dx.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sbdad25e55d1c408eab59a3c19cb1b815v.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S5791e56a7f4d4c13bc361a32c2907d44K.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sff40921d4958455ea0c70e540141dbcdw.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S6303c3c7b1e748b28738ca4297f257cfS.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S87099bb68b674e76a9cfe572211d80f1G.jpg_640x640q90.jpg'], 'description': []},
  {'name': '여성 재킷, 패션 트위드 체크 블레이저 코트, 빈티지 긴 소매 포켓 여성 겉옷, 세련된 재킷, 여성 재킷', 'addr': 'https://www.aliexpress.com/item/1005004424678841.html', 'min_price': 34042.0, 'min_currency': 'KRW', 'max_price': 38056.0, 'max_currency': 'KRW', 'option': [{'name': '색상:Gray;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Blue;크기:Xs', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:Xs', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Multi;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 295}, {'name': '색상:Blue;크기:S', 'price': 77560.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Green;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Gray;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 288}, {'name': '색상:Red;크기:S', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Blue;크기:M', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:M', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': ' 색상:Multi;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 292}, {'name': '색상:Blue;크기:L', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Light Green;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 297}, {'name': '색상:Green;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 289}, {'name': '색상:Red;크기:L', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색 상:Light Green;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}], 'img': ['https://ae01.alicdn.com/kf/S8d40b54a080f4dd4a45c18a1c71a1408j.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Hd1f34768a6044da0826df27b9898d4dar.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sb3320276fb374b97be0f5161534daca2d.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sa6bd260a29654e0a84942bc372cb6df3k.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S77fbff7d268e44379a1c5786f74f8a62e.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S949b7516f58e4b738495e392b04cf09dx.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sbdad25e55d1c408eab59a3c19cb1b815v.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S5791e56a7f4d4c13bc361a32c2907d44K.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sff40921d4958455ea0c70e540141dbcdw.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S6303c3c7b1e748b28738ca4297f257cfS.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S87099bb68b674e76a9cfe572211d80f1G.jpg_640x640q90.jpg'], 'description': []}]

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [id, setId] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    // upload();
    dispatch(listProducts(category));

    return () => {
      //
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

    // e.preventDefault();
    // for (let i=0;i<1;i++) {
    //   dispatch(
    //     saveProduct({
    //       _id: id,
    //       name: "name3",
    //       price: parseInt(data[0]["min_price"]),
    //       image: data[0]["img"][0],
    //       brand,
    //       category,
    //       countInStock,
    //       description: data[0]["description"],
    //       currency,
    //     })
    //   );
    // }
    // e.preventDefault();
    for (let i=0;i<data.length;i++){
      let d = data[i];
      let des = "";
      if (d["description"].length != 0){
        for (let j=0;j<d["description"].length;j++){
          des=des+d["description"][j]
        }
      }else{
        des = "no description"
      }
      dispatch(
        saveProduct({
          _id: id,
          name: d['name'],
          minprice: parseInt(d["min_price"]),
          maxprice: parseInt(d["max_price"]),
          image: d["img"][0],
          brand: "no",
          category:"Rompers",
          countInStock:1,
          description: des,
          currency: d["min_currency"],
          optionn: d["option"],
          addr: d["addr"]
        })
      );
    }
    return 0;
  };

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
                {/* <div className="product-brand">{product.brand}</div> */}
                <div className="product-price">From {product.minprice}{product.currency}</div>
                {/* <div className="product-rating"> */}
                {/*   <Rating */}
                {/*     value={product.rating} */}
                {/*     text={product.numReviews + ' reviews'} */}
                {/*   /> */}
                {/* </div> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
