import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, saveProduct } from '../actions/productActions';
import Rating from '../components/Rating';
//import testdata from './localdata.js';
import Asymmetricalskirt from './data/Asymmetrical skirt';
import BallGownskirt from './data/Ball Gown skirt';
import Budskirt from './data/Bud skirt';
import HalfSleeveDress from './data/Half-Sleeve Dress';
import LongSleeveDress from './data/Long-Sleeve Dress';
import PencilJeans from './data/Pencil Jeans';
import PencilSkirt from './data/Pencil Skirt';
import Pleatedskirt from './data/Pleated skirt';
import Rompers from './data/Rompers ';
import StraightSkirt from './data/Straight Skirt';
import Cardigans from './data/Cardigans ';
import StraightJeans from './data/Straight Jeans';

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
// },{
//   "name": "V6 리튬 이온 배터리 플라스틱 케이스 충전 보호 회로 기판 PCB 다이슨 21.6V DC58 DC62 DC63 DC72 진공 청소기",
//   "addr": "https://www.aliexpress.com/item/1005003357261140.html",
//   "min_price": 14359,
//   "min_currency": "KRW",
//   "max_price": 14359,
//   "max_currency": "KRW",
//   "option": null,
//   "img": [
//     "https://ae01.alicdn.com/kf/Hb1ed86a5bb994c05963aa1afc50bbed5G.jpg_640x640q90.jpg",
//     "https://ae01.alicdn.com/kf/H123aa88613ec4a8782f8a5034c9afcc6h.jpg_640x640q90.jpg",
//     "https://ae01.alicdn.com/kf/H77af20128dda437aa83b883f9ac983bb3.jpg_640x640q90.jpg",
//     "https://ae01.alicdn.com/kf/Hd52528b046034827b1ad7d5916935745r.jpg_640x640q90.jpg",
//     "https://ae01.alicdn.com/kf/Hdebe42e3938c4e1188c73805de089747R.jpg_640x640q90.jpg"
//   ],
//   "description": [
//     "약 Doscing",
//     "우리는 aliexpress에 있는 믿을 수 있는 판매인입니다, 우리는 우리의 waranty를 항상 명예합니다.",
//     "당신이 접근 도중 우리의 제품에 관하여 아무 문제나 있는 경우에, 이메일을 통해서 저희에게 연락하십시오",
//     "고객 지원을 위해, 우리는 몇 시간 안에 반환할 것입니다.",
//     "대량 순서가, 우리 당신에게 도매가를 제안하는 경우에 저희에게 연락하는 환영.",
//     "Doscing의 목적: 고품질, 더 나은 서비스!",
//     "준비 조립 전:",
//     "1. 새로운 코어가 사용되는 경우 주목하십시오:",
//     "(1). 18650 힘 리튬 건전지 및 작은 내부 저항, 동일한 모형 및 동일한 모수를 이용하십시오,",
//     "에너지 저장을위한 일반 리튬 배터리를 사용하지 마십시오.",
//     "(2). 단 하나 18650 건전지의 전압을 시험하십시오,",
//     "각 18650 배터리의 전압이 동일하도록 단일 배터리를 충전하십시오. 18650 배터리 셀의 전압은 4.1V 이상이어야합니다.",
//     "2. 오래된 건전지가 고쳐지는 경우에, 각 세포의 양쪽 끝에 전압을 시험하십시오. 전압이 다른 경우에, 동일한 전압 가치에 각 세포를 위탁하십시오.",
//     "매우 중요합니다",
//     "각 18650 셀의 전압은 pcb를 용접하기 전에 동일합니다.",
//     "각 18650 셀의 전압이 동일하다는 것을 확인하십시오.",
//     "18650 배터리 셀의 전압은 4.1V 이상이어야합니다.",
//     "특징:",
//     "1. 내장 6 Pcs INR18650 배터리 셀.",
//     "2.DIY 당신의 기계 건전지를 위한 수용량.",
//     "3. 직업적인 사용을 위한 고품질",
//     "4. 본래 장치 및 내구재를 가진 높은 겸용성",
//     "5. 건전지 팩을 고치고 조립하는 도움",
//     "새로운 배터리를 diy하는 방법",
//     "고시: Pleae 붙박이 높은 qualtiy 동일한 상표 및 동일한 수용량 INR18650 30A 출력 건전지 세포. 어떤 질문든지 저희에게 연락하게 자유롭게 느낍니다.",
//     "패키지에",
//     "1 set V6 배터리 케이스 다음과 같은 그림."
//   ]
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
    const totaldata= [Budskirt, StraightJeans, HalfSleeveDress,LongSleeveDress,PencilJeans,PencilSkirt,Pleatedskirt,Rompers,StraightSkirt]
    const totaldataname= ["Sport","StraightJeans","HalfSleeveDress","LongSleeveDress","PencilJeans","PencilSkirt","Pleatedskirt","Rompers","StraightSkirt"]

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
      return 0;
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
