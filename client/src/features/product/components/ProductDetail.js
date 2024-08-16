import { useNavigate, Link, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../components/Rating";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
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
} from "../../../components/Functions";
import Skeleton from "../../../components/loading/Skeleton";

const colors = [
  { name: "Black", bg: "bg-black", ring: "ring-black" },
  { name: "White", bg: "bg-white", ring: "ring-white" },
  { name: "Gray", bg: "bg-gray-500", ring: "ring-gray-500" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = ({ setTitle }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
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
      {!productLoading && product ? (
        <div className="pt-6 flex flex-col xl:w-4/6">
          <div className="sm:flex w-full gap-5 lg:gap-12">
            {/* Image gallery */}
            <div className="mt-6 flex flex-col sm:flex-row-reverse gap-5">
              <div>
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="mx-auto lg:h-full h-4/6 w-[20rem] md:w-[25rem] lg:w-[35rem] object-cover object-center"
                />
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
              <div>
                <p className="text-2xl flex gap-1 font-bold tracking-tight sm:text-2xl">
                  {product.title} - {product.brand}
                  <p className="bg-[#333333] text-sm h-min p-1 my-auto ml-2">
                    {" "}
                    {product.category}
                  </p>
                </p>
              </div>

              {/* Options */}
              <div className="bg-[#333333] relative w-full h-min p-4 lg:p-8 mt-4">
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

                <form className="mt-10">
                  {/* Colors */}
                  {colors && (
                    <div>
                      <h3 className="text-sm font-medium">Color</h3>
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="mt-4"
                      >
                        <div className="flex items-center space-x-3">
                          {colors.map((color) => (
                            <RadioGroup.Option
                              key={color.name}
                              value={color}
                              className={({ checked }) =>
                                classNames(
                                  color.ring,
                                  checked ? "ring-2" : "",
                                  "relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                )
                              }
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.bg,
                                  "h-8 w-8 rounded-full border border-black"
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Sizes */}
                  {sizes && (
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Size</h3>
                        <Link
                          to="#"
                          className="text-sm font-medium text-[#3498DB] hover:opacity-80"
                        >
                          Size guide
                        </Link>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2 grid-cols-4 lg:grid-cols-4">
                          {sizes.map((size) => (
                            <RadioGroup.Option
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={({ checked }) =>
                                classNames(
                                  size.inStock
                                    ? "cursor-pointer shadow-sm"
                                    : "cursor-not-allowed opacity-60",
                                  checked ? "bg-[#3498DB]" : "",
                                  "group relative flex items-center justify-center border py-3 px-4 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size.name}
                                  </RadioGroup.Label>
                                  {size.inStock ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "border-white"
                                          : "border-transparent",
                                        "pointer-events-none absolute border-2 -inset-px"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px border border-white"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-white"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                  <div className="mt-5 mb-3 text-[#E74C3C]">
                    {product.stock === 0
                      ? "Product out of stock."
                      : `Only ${product.stock} left in stock.`}
                  </div>
                  {itemInCart === -1 ? (
                    <button
                      onClick={(e) => handleAddToCart(e)}
                      disabled={product.stock === 0}
                      className="flex w-full justify-center border bg-[#3498DB] text-white py-3 font-bold hover:opacity-80 disabled:cursor-not-allowed opacity-80"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-end justify-between text-sm mt-12">
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
                      <div className="flex">
                        <button
                          type="button"
                          onClick={(e) => handleRemove(e, product.id)}
                          className="font-medium text-[#E74C3C] hover:opacity-80"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
              {product.highlights && (
                <div className="mt-10 hidden lg:block">
                  <h3 className="text-lg font-bold">Highlights</h3>

                  <div className="mt-4">
                    <ul className="list-disc space-y-2 pl-4 text-sm">
                      {product.highlights.map((highlight) => (
                        <li key={highlight}>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description and details */}
          <div>
            {product.highlights && (
              <div className="mt-10 block lg:hidden">
                <h3 className="text-lg font-bold">Highlights</h3>
                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight}>
                        <span className="text-justify">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="mt-10">
              <div>
                <div className="space-y-6 mt-10">
                  <p className="text-base text-justify">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-6 flex flex-col xl:w-4/6">
          <Skeleton count={6} />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
