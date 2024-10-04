import { useNavigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../components/Rating";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import toast from "react-hot-toast";
import {
  fetchProductByIdAsync,
  selectProductLoading,
  selectProductById,
} from "../productSlice";
import {
  removeFromCartAsync,
  selectCartItems,
  updateItemAsync,
  addToCartAsync,
} from "../../cart/cartSlice";
import {
  formatPriceInINR,
  discountedPrice,
  capitalizeFirstLetter,
} from "../../../components/Functions";
import Skeleton from "../../../components/loading/Skeleton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = ({ setTitle }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const product = useSelector(selectProductById);
  const productLoading = useSelector(selectProductLoading);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
    setSelectedImage(0);
  }, [dispatch, params.id]);

  useEffect(() => {
    setTitle(product?.title);
  }, [product]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (user) {
      const newItem = {
        quantity: 1,
        user: user.id,
        product: product.id,
      };
      dispatch(addToCartAsync(newItem));
      toast.success("Added to cart");
    } else {
      toast.error("Login First");
      navigate("/login");
    }
  };

  const handleQuantityChange = (e, item) => {
    dispatch(
      updateItemAsync({
        id: item.id,
        quantity: +e.target.value,
      })
    );
  };

  const itemInCart = cartItems?.findIndex(
    (item) => item?.product.id === product?.id
  );

  const handleRemove = (e, id) => {
    e.preventDefault();
    try {
      dispatch(removeFromCartAsync(id));
      toast.success("Item removed");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex flex-col xl:w-5/6">
        {!productLoading && product ? (
          <div className="sm:flex w-full gap-5 lg:gap-12">
            {/* Image gallery */}
            <div className="mt-6 flex flex-col sm:flex-row-reverse gap-5">
              <div>
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="mx-auto lg:h-full h-4/6 w-[20rem] md:w-[25rem] lg:w-[35rem] object-cover object-center ring-1 ring-white mb-4"
                />
                {itemInCart === -1 ? (
                  <button
                    onClick={(e) => handleAddToCart(e)}
                    disabled={product.stock === 0}
                    className="flex w-full justify-center border bg-[#3498DB] text-white py-3 font-bold hover:opacity-80 disabled:cursor-not-allowed opacity-80"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-end justify-between text-sm gap-6">
                    <p className="flex items-center gap-3">
                      Qty
                      <select
                        defaultValue={cartItems[itemInCart].quantity}
                        className="bg-inherit"
                        onChange={(e) =>
                          handleQuantityChange(e, cartItems[itemInCart])
                        }
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (quantity) => (
                            <option
                              className="bg-black text-white"
                              key={quantity}
                              value={quantity}
                            >
                              {quantity}
                            </option>
                          )
                        )}
                      </select>
                    </p>
                    <button
                      type="button"
                      onClick={(e) => handleRemove(e, product.id)}
                      className="flex w-full justify-center items-center gap-2 border bg-[#E74C3C] text-white py-3 font-bold hover:opacity-80 disabled:cursor-not-allowed opacity-80"
                    >
                      <BsCartX className="text-2xl" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <RadioGroup value={selectedImage} onChange={setSelectedImage}>
                <div className="flex flex-row sm:flex-col gap-2 sm:gap-10">
                  {product.images.map((img, id) => (
                    <RadioGroup.Option
                      key={id}
                      value={id}
                      onClick={() => setSelectedImage(id)}
                      className={({ checked }) =>
                        classNames(
                          checked ? "ring-2 ring-white" : "",
                          "relative flex cursor-pointer items-center justify-center p-0.5 focus:outline-none"
                        )
                      }
                    >
                      <img
                        src={img}
                        alt={product.title}
                        className="h-20 w-16 object-cover object-center"
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Product info */}
            <div className="mt-6 flex flex-col md:flex-grow">
              <div className="flex justify-between">
                <p className="text-2xl flex gap-1 font-bold tracking-tight sm:text-2xl">
                  {product.title}{product.brand && ` - ${product.brand}`}
                </p>
                <p className="bg-[#333333] text-sm h-min p-1 my-auto ml-2">
                  {capitalizeFirstLetter(product.category)}
                </p>
              </div>

              {/* Options */}
              <div className="bg-[#333333] relative w-full h-min p-4 lg:p-8 mt-4 gap-5 flex flex-col">
                <div className="absolute lg:-translate-x-9 lg:-translate-y-9 -translate-x-5 -translate-y-5 flex lg:text-sm text-xs font-bold text-white bg-[#E74C3C] justify-center z-10 p-1">
                  <span className="my-auto">
                    {product.discountPercentage}% off
                  </span>
                </div>
                <div className="flex gap-2">
                  <p className="whitespace-nowrap text-2xl font-bold line-through text-gray-400">
                    {formatPriceInINR(product.price)}
                  </p>
                  <p className=" whitespace-nowrap text-3xl font-bold text-gray-200">
                    {discountedPrice(product.price, product.discountPercentage)}
                  </p>
                </div>

                <Rating rating={product.rating} />
                <div className="text-[#E74C3C]">
                  {product.stock === 0
                    ? "Product out of stock."
                    : product.stock < 20 &&
                      `Only ${product.stock} left in stock.`}
                </div>
                {product.description && (
                  <div className="flex gap-6">
                    <p className="font-light">Description</p>
                    <p className="text-base text-justify">
                      {product.description}
                    </p>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex gap-6">
                    <p className="font-light">Dimensions</p>
                    <p className="text-base items-center text-justify flex gap-2">
                      {product.dimensions.height}
                      (H) x {product.dimensions.width}
                      (W) x {product.dimensions.depth}(D)
                    </p>
                  </div>
                )}
                {product.tags.length > 0 && (
                  <div className="flex gap-6">
                    <p className="font-light">Tags</p>
                    <p className="text-base items-center text-justify flex gap-2">
                      {product.tags.map((tag) => (
                        <p>{capitalizeFirstLetter(tag)}</p>
                      ))}
                    </p>
                  </div>
                )}
                <div className="flex gap-6 flex-wrap">
                  {product.warrantyInformation && (
                    <p className="text-base ring-1 text-[#3498DB] items-center flex justify-between px-2 py-1 whitespace-nowrap">
                      {product.warrantyInformation}
                    </p>
                  )}
                  {product.shippingInformation && (
                    <p className="text-base ring-1 text-[#3498DB] items-center flex justify-between px-2 py-1 whitespace-nowrap">
                      {product.shippingInformation}
                    </p>
                  )}
                  {product.returnPolicy && (
                    <p className="text-base ring-1 text-[#3498DB] items-center flex justify-between px-2 py-1 whitespace-nowrap">
                      {product.returnPolicy}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton count={6} />
        )}
      </div>
    </>
  );
};

export default ProductDetail;
