import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


function App() {

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
            <Link to="/">Your Stylist</Link>
          </div>
          <div className="header-links">
            <Link to="/wishlist">Wishlist</Link>


          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            {
            <>
              <li>
                <Link to="/category/Blouse">Blouse</Link>
              </li>

              <li>
                <Link to="/category/Cardigans">Cardigans</Link>
              </li>

              <li>
                <Link to="/category/Hoodies">Hoodies & Sweatshirts</Link>
              </li>

              <li>
                <Link to="/category/Jeans">Jeans</Link>
              </li>

              <li>
                <Link to="/category/Jump">Jumpsuits</Link>
              </li>

              <li>
                <Link to="/category/PantsCapris">Pants & Capris</Link>
              </li>

              <li>
                <Link to="/category/Rompers">Rompers </Link>
              </li>

              <li>
                <Link to="/category/Skirt">Skirt</Link>
              </li>

              <li>
                  <Link to="/category/SleevelessDress">Sleeveless Dress</Link>
              </li>

              <li>
                <Link to="/category/Tshirt">T-shirt</Link>
              </li>


              </>

            }
          </ul>
        </aside>
        <main className="main">
          <div className="content">

            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/wishlist/:id?" component={CartScreen} />
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
