import { useEffect, useState } from "react";
import ProductItems from "../shared/ProductItems";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";

function OriginalProducts() {
  const [loading, setLoading] = useState(true);

  const [originalProduct, setOriginalProduct] = useState([]);

  const fetchOriginalProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/public/products/collection/original"
      );
      setOriginalProduct(response.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(axiosErrorManager(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOriginalProduct();
  }, []);

  return (
    <div
      className={`${
        loading ? "h-[20vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-col items-center w-[100%] mt-20 px-3 lg:p-2">
          <h1 className="text-xl sm:text-2xl font-serif tracking-wide underline">
            IN HOUSE DESIGNS
          </h1>
          <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 mt-20">
            {originalProduct.map((item, index) => (
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
      )}
    </div>
  );
}

export default OriginalProducts;
