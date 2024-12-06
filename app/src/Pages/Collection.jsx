import {useEffect, useState } from "react";
import ProductItems from "../shared/ProductItems";
import ScrollTop from "../shared/ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../Redux/PublicSlice";


function Collection() {
  const dispatch=useDispatch()
  const {products,loading,error}=useSelector((state)=>state.public)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const checkCategory = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategories((prev) => [...prev, e.target.value]);
    }
  };
  useEffect(()=>{
dispatch(fetchAllProducts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(() => {
    if (categories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => categories.includes(item.category))
      );
    }
    if(error)console.log(error)
  }, [categories, error, products]);

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="pt-[26%] sm:pt-[8%] flex flex-col items-center">
          <h1
            className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10 sm:mb-16"
            style={{ textShadow: "0 0 1px #000000" }}
          >
            SHOP COLLECTIONS
          </h1>
          <div className="w-full px-2">
            <div className="bg-[#F9FCFA] flex items-center justify-between h-10 mb-5 p-3 rounded-md">
              <p className="text-nowrap text-xs sm:text-[100%]">
                <input type="checkbox" onChange={checkCategory} value={"bed"} />{" "}
                BEDS
              </p>
              <p className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="checkbox"
                  onChange={checkCategory}
                  value={"lamps"}
                />{" "}
                LAMPS
              </p>
              <p className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="checkbox"
                  onChange={checkCategory}
                  value={"tables"}
                />{" "}
                TABLES
              </p>
              <p className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="checkbox"
                  onChange={checkCategory}
                  value={"chairs"}
                />{" "}
                CHAIRS
              </p>
              <p className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="checkbox"
                  onChange={checkCategory}
                  value={"sofas"}
                />{" "}
                SOFAS
              </p>
            </div>
            
            <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 w-full">
              {filteredProducts.map((item, index) => (
                <ProductItems
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  original={item.original}
                />
              ))}
            </div>
          </div>
          <ScrollTop />
        </div>
      )}
    </div>
  );
}

export default Collection;
