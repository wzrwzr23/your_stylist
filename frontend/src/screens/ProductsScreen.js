import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';

const data = [{'name': '여성 재킷, 패션 트위드 체크 블레이저 코트, 빈티지 긴 소매 포켓 여성 겉옷, 세련된 재킷, 여성 재킷', 'addr': 'https://www.aliexpress.com/item/1005004424678841.html', 'min_price': 34042.0, 'min_currency': 'KRW', 'max_price': 38056.0, 'max_currency': 'KRW', 'option': [{'name': '색상:Gray;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Blue;크기:Xs', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:Xs', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Multi;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 295}, {'name': '색상:Blue;크기:S', 'price': 77560.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Green;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Gray;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 288}, {'name': '색상:Red;크기:S', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Blue;크기:M', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:M', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': ' 색상:Multi;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 292}, {'name': '색상:Blue;크기:L', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Light Green;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 297}, {'name': '색상:Green;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 289}, {'name': '색상:Red;크기:L', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색 상:Light Green;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}], 'img': ['https://ae01.alicdn.com/kf/S8d40b54a080f4dd4a45c18a1c71a1408j.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Hd1f34768a6044da0826df27b9898d4dar.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sb3320276fb374b97be0f5161534daca2d.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sa6bd260a29654e0a84942bc372cb6df3k.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S77fbff7d268e44379a1c5786f74f8a62e.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S949b7516f58e4b738495e392b04cf09dx.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sbdad25e55d1c408eab59a3c19cb1b815v.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S5791e56a7f4d4c13bc361a32c2907d44K.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sff40921d4958455ea0c70e540141dbcdw.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S6303c3c7b1e748b28738ca4297f257cfS.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S87099bb68b674e76a9cfe572211d80f1G.jpg_640x640q90.jpg'], 'description': []},
  {'name': '여성 재킷, 패션 트위드 체크 블레이저 코트, 빈티지 긴 소매 포켓 여성 겉옷, 세련된 재킷, 여성 재킷', 'addr': 'https://www.aliexpress.com/item/1005004424678841.html', 'min_price': 34042.0, 'min_currency': 'KRW', 'max_price': 38056.0, 'max_currency': 'KRW', 'option': [{'name': '색상:Gray;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Blue;크기:Xs', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:Xs', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Multi;크기:Xs', 'price': 69463.0, 'currency': 'KRW', 'quantity': 295}, {'name': '색상:Blue;크기:S', 'price': 77560.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:Xs', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Green;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Gray;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:S', 'price': 69463.0, 'currency': 'KRW', 'quantity': 288}, {'name': '색상:Red;크기:S', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Light Green;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Deep Blue;크기:S', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Blue;크기:M', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Red;크기:M', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Green;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': ' 색상:Multi;크기:M', 'price': 69463.0, 'currency': 'KRW', 'quantity': 292}, {'name': '색상:Blue;크기:L', 'price': 77560.0, 'currency': 'KRW', 'quantity': 299}, {'name': '색상:Light Green;크기:M', 'price': 72098.0, 'currency': 'KRW', 'quantity': 297}, {'name': '색상:Green;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Gray;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 298}, {'name': '색상:Multi;크기:L', 'price': 69463.0, 'currency': 'KRW', 'quantity': 289}, {'name': '색상:Red;크기:L', 'price': 77657.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색 상:Light Green;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}, {'name': '색상:Deep Blue;크기:L', 'price': 72098.0, 'currency': 'KRW', 'quantity': 300}], 'img': ['https://ae01.alicdn.com/kf/S8d40b54a080f4dd4a45c18a1c71a1408j.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Hd1f34768a6044da0826df27b9898d4dar.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sb3320276fb374b97be0f5161534daca2d.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sa6bd260a29654e0a84942bc372cb6df3k.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S77fbff7d268e44379a1c5786f74f8a62e.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S949b7516f58e4b738495e392b04cf09dx.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sbdad25e55d1c408eab59a3c19cb1b815v.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S5791e56a7f4d4c13bc361a32c2907d44K.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/Sff40921d4958455ea0c70e540141dbcdw.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S6303c3c7b1e748b28738ca4297f257cfS.jpg_640x640q90.jpg', 'https://ae01.alicdn.com/kf/S87099bb68b674e76a9cfe572211d80f1G.jpg_640x640q90.jpg'], 'description': []}]

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [minprice, setMinprice] = useState('');
  const [maxprice, setMaxprice] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  // const [option, setOption] = useState('');

  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setMinprice(product.minprice);
    setMaxprice(product.maxprice);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setCurrency("SGD");
  };
  const submitHandler = (e) => {
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
    e.preventDefault();
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
          name: d["name"],
          minprice: parseInt(d["min_price"]),
          maxprice: parseInt(d["max_price"]),
          image: d["img"][0],
          brand: "no",
          category:"Shirts",
          countInStock:1,
          description: des,
          currency: d["min_currency"],
          optionn: d["option"],
          addr: d["addr"]
        })
      );
    }
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Minprice</label>
                <input
                  type="text"
                  name="minprice"
                  value={minprice}
                  id="price"
                  onChange={(e) => setMinprice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Maxprice</label>
                <input
                  type="text"
                  name="maxprice"
                  value={maxprice}
                  id="price"
                  onChange={(e) => setMaxprice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Currency</label>
                <input
                  type="text"
                  name="price"
                  value="CNY"
                  id="currency"
                  onChange={(e) => setCurrency(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.minprice}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
