import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    createRoutesFromElements,
    Route,
    ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";

import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact" ;
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import AdminNavbar from "./components/user/AdminNavbar";
import ActiveUser from "./components/user/ActiveUser";
import FetchDeletedUsers from "./components/user/FetchDeletedUser";
import UserDetails from "./components/user/UserDetails";
import Category from "./pages/Category/Category";
import Profile from "./pages/About/Profile";
import ResetPassword from "./pages/Account/ResetPassword";
import SearchResults from "./components/user/SearchResults";
import UserProfile from "./pages/Account/UserProfile ";
import AddProduct from "./components/user/AddProduct";
import Checkout from "./pages/checkout/Checkout";

const Layout = () => {
    return (
        <div>
            <Header/>
            <HeaderBottom/>
            <SpecialCase/>
            <ScrollRestoration/>
            <Outlet/>
            <Footer/>
            <FooterBottom/>
        </div>
    );
};
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>
                {/* ==================== Header Navlink Start here =================== */}
                <Route index element={<Home/>}></Route>
                <Route path="/shop" element={<Shop/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/user-profile/" element={<UserProfile/>}/>


                <Route path="/contact" element={<Contact/>}></Route>
                {/* ==================== Header Navlink End here ===================== */}
                <Route path="/offer" element={<Offer/>}></Route>
                <Route path="/category/:categoryName" element={<Category/>}></Route>
                <Route
                    path="/product/:productName"
                    element={<ProductDetails/>}
                ></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/paymentgateway" element={<Payment/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/user-profile/" element={<UserProfile/>}/>

            </Route>
            <Route path="/admin"
                   element={<AdminNavbar/>}>
                <Route path="/admin/active-users" element={<ActiveUser/>}/>
                <Route path="/admin/fetch-deleted-users" element={<FetchDeletedUsers/>}/>
                <Route path="user-detail/:id" element={<UserDetails/>}/>
                <Route path="/admin/search-results" element={<SearchResults/>}/>
                <Route path="/admin/add-product" element={<AddProduct/>}/>
            </Route>

            <Route path="/admin" element={<AdminNavbar/>}>
                <Route path="/admin/active-users" element={<ActiveUser/>}/>
                <Route
                    path="/admin/fetch-deleted-users"
                    element={<FetchDeletedUsers/>}
                />
                <Route path="user-detail/:id" element={<UserDetails/>}/>
                <Route path="/admin/search-results" element={<SearchResults/>}/>
            </Route>

            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/forgot-password" element={<ResetPassword/>}></Route>
        </Route>
    ),
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;