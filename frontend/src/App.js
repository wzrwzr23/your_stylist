import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">amazona</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Wishlist</a>
            {/* {userInfo ? ( */}
            {/*   <Link to="/profile">{userInfo.name}</Link> */}
            {/* ) : ( */}
            {/*   <Link to="/signin">Sign In</Link> */}
            {/* )} */}

          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            {
            <><li>
                <Link to="/category/PencilJeans">Pencil Jeans</Link>
              </li>

              <li>
                  <Link to="/category/PencilSkirt">Pencil Skirt </Link>
              </li>

              <li>
                  <Link to="/category/Asymmetricalskirt">Asymmetrical skirt </Link>
              </li>

              <li>
                  <Link to="/category/StraightSkirt">Straight Skirt </Link>
              </li>    

              <li>
                  <Link to="/category/Rompers">Rompers </Link>
              </li>    

              <li>
                  <Link to="/category/Pleatedskirt">Pleated skirt </Link>
              </li> 

              <li>
                  <Link to="/category/Long-SleeveDress">Long-Sleeve Dress </Link>
              </li>               

              <li>
                  <Link to="/category/Half-SleeveDress">Half-Sleeve Dress </Link>
              </li>   

              <li>
                  <Link to="/category/Budskirt">Bud skirt </Link>
              </li>  

              <li>
                  <Link to="/category/BallGownskirt">Ball Gown skirt </Link>
              </li>  
              </>           
            /* <li>
              <Link>Women</Link>
            </li>

            <li>
              <Link to="/category/Rompers">Rompers</Link>
            </li>

            <li>
              <Link to="/category/PantsCapris">Pants & Capris</Link>
            </li>

            <li>
              <Link>Dress</Link>
            </li>

            <li>
              <Link to="/category/SleevelessDress">---- Sleeveless Dress</Link>
            </li>

            <li>
              <Link to="/category/Long-SleeveDress">---- Long-Sleeve Dress</Link>
            </li>

            <li>
              <Link to="/category/Short-SleeveDress">---- Short-Sleeve Dress</Link>
            </li>

            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li> */
            }
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
