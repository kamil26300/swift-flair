import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  createNewProductAsync,
  fetchProductByIdAsync,
  updateProductAsync,
  selectProductById,
  selectFilters,
} from "../../product/productSlice";

const ProductForm = () => {
  const product = useSelector(selectProductById);
  const filters = useSelector(selectFilters);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product) {
      setFields({
        title: product?.title || "",
        description: product?.description || "",
        brand: product?.brand || null,
        category: product?.category || null,
        price: +product?.price,
        discountPercentage: +product?.discountPercentage,
        stock: +product?.stock,
        thumbnail: product?.thumbnail || "",
        img2: product?.images[1] || "",
        img3: product?.images[2] || "",
        img4: product?.images[3] || "",
      });
    }
  }, [product]);

  const [isDisabled, setDisabled] = useState(true);
  const keys = [
    "title",
    "description",
    "brand",
    "category",
    "price",
    "discountPercentage",
    "stock",
    "thumbnail",
    "img2",
    "img3",
    "img4",
  ];
  const [fields, setFields] = useState(
    keys.reduce((obj, key) => ({ ...obj, [key]: "" }), {})
  );
  const [errors, setErrors] = useState(
    keys.reduce((obj, key) => ({ ...obj, [key]: "" }), {})
  );

  const inputCSS = (field) =>
    `w-full text-black text-sm py-2 px-3 border-2 border-gray-300 focus:outline-none ${
      !errors[field]
        ? "focus:border-cyan-400"
        : "border-red-600 focus:border-red-600 outline-none"
    }`;
  const errorCSS = "text-red-600 text-sm p-3";

  const numInputs = [
    { label: "Price ₹", name: "price" },
    { label: "Discount Percentage", name: "discountPercentage" },
    { label: "Stock", name: "stock" },
  ];

  const imageInput = [
    { label: "Image 1 / Thumbnail", name: "thumbnail" },
    { label: "Image 2 (optional)", name: "img2" },
    { label: "Image 3 (optional)", name: "img3" },
    { label: "Image 4 (optional)", name: "img4" },
  ];

  const validateForm = (value, field) => {
    let error = "";

    switch (field) {
      case "title":
        if (value.length === 0) {
          error = "Product Name is mandatory";
        } else {
          error = !/^[A-Za-z0-9\s]+$/.test(value)
            ? "Product Name format incorrect"
            : "";
        }
        break;

      case "description":
        if (value.length === 0) {
          error = "Description is mandatory";
        }
        break;

      case "price":
        if (value.length === 0) {
          error = "Price is mandatory";
        } else if (value <= 0 || value >= 500000) {
          error = "Price should be between 0 and 5 lakh";
        }
        break;

      case "discountPercentage":
        if (value.length === 0) {
          error = "Discount is mandatory";
        } else if (value < 0 || value > 100) {
          error = "Discount should lie within 0 and 100";
        }
        break;

      case "stock":
        if (value.length === 0) {
          error = "Stock is mandatory";
        } else if (value < 0) {
          error = "Stock should be a natural number";
        }
        break;

      case "thumbnail":
        if (value.length === 0) {
          error = "Mandatory";
        }
        break;

      case "brand":
      case "category":
        if (value === "--Choose one") {
          error = "Select a brand";
        }
        break;

      default:
        break;
    }
    // Update the errors state
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  useEffect(() => {
    const setDisabledBtn = () => {
      const allFieldsFilled = Object.keys(fields)
        .filter((key) => !["img2", "img3", "img4"].includes(key))
        .every((key) => fields[key] !== "");

      const isErrorFieldEmpty = Object.values(errors).every(
        (value) => value === ""
      );
      setDisabled(!(allFieldsFilled && isErrorFieldEmpty));
    };
    setDisabledBtn();
  }, [fields, errors, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateForm(value, name);
    setFields((prevFields) => ({
      ...prevFields,
      [name]: e.target.type === "number" ? parseInt(value) : value,
    }));
  };

  const resetFields = () => {
    const newFields = { ...fields };
    for (const key in newFields) {
      newFields[key] = "";
    }
    setFields(newFields);
    setErrors(newFields);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const product = { ...fields };
    product.images = [
      product.thumbnail,
      product.img2,
      product.img3,
      product.img4,
    ];
    delete product["img2"];
    delete product["img3"];
    delete product["img4"];
    if (params.id) {
      product.id = params.id;
      try {
        dispatch(updateProductAsync(product));
        toast.success("Product updated successfully");
        navigate("/admin");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    } else {
      product.rating = 0;
      product.deleted = false;
      try {
        dispatch(createNewProductAsync(product));
        toast.success("Product added successfully");
        navigate("/admin");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    }
  };

  const handleDelete = (alreadyDeleted) => {
    const currentProduct = { ...product };
    currentProduct.deleted = !alreadyDeleted;
    try {
      dispatch(updateProductAsync(currentProduct));
      toast.success(`Product ${alreadyDeleted ? "restored" : "deleted"} successfully`);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form className="min-w-[75%]" onSubmit={handleAdd}>
      <div className="border-b border-white pb-8">
        <h2 className="text-lg font-semibold">Product Form</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Product name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="given-name"
                value={fields.title}
                onChange={handleChange}
                className={inputCSS("title")}
              />
              <div className={errorCSS}>{errors.title}</div>
            </div>
          </div>

          <div className="sm:col-span-5">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                id="description"
                value={fields.description}
                autoComplete="description"
                onChange={handleChange}
                className={inputCSS("description")}
                rows="4"
                cols="50"
              />

              <div className={errorCSS}>{errors.description}</div>
            </div>
          </div>

          {filters.map((item) => (
            <div className="sm:col-span-3">
              <label htmlFor={item.id} className="block text-sm font-medium">
                {item.name}
              </label>
              <div className="mt-2">
                <select
                  name={item.id}
                  id={item.id}
                  autoComplete={item.id}
                  value={fields[item.id]}
                  onChange={handleChange}
                  className={inputCSS(item.id)}
                >
                  <option value={null}>--Choose one</option>
                  {item.options.map((subItem) => (
                    <option key={subItem.value} value={subItem.value}>
                      {subItem.label}
                    </option>
                  ))}
                </select>

                <div className={errorCSS}>{errors[item.id]}</div>
              </div>
            </div>
          ))}

          {numInputs.map((input) => (
            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium">
                {input.label}
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name={input.name}
                  id={input.name}
                  autoComplete={fields[input.name]}
                  value={fields[input.name]}
                  onChange={handleChange}
                  className={
                    inputCSS(input.name) +
                    " [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  }
                  onFocus={(e) =>
                    e.target.addEventListener(
                      "wheel",
                      function (e) {
                        e.preventDefault();
                      },
                      { passive: false }
                    )
                  }
                />
                <div className={errorCSS}>{errors[input.name]}</div>
              </div>
            </div>
          ))}
          {imageInput.map((input) => (
            <div className="sm:col-span-3">
              <label htmlFor="fullName" className="block text-sm font-medium">
                {input.label}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name={input.name}
                  id={input.name}
                  autoComplete={fields[input.name]}
                  value={fields[input.name]}
                  onChange={handleChange}
                  className={inputCSS(input.name)}
                />
                <div className={errorCSS}>{errors[input.name]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex sm:flex-row flex-col-reverse gap-4 justify-between mt-6">
        <div className="flex gap-x-5">
          {params.id && (
            <button
              type="button"
              onClick={() => handleDelete(product?.deleted)}
              className="flex justify-center py-2 gap-2 whitespace-nowrap px-3 bg-[#E74C3C] hover:opacity-80 text-white font-semibold focus:outline-none"
            >
              {product?.deleted ? (
                "Restore"
              ) : (
                <>
                  <MdDeleteForever className=" mt-1 scale-150" />
                  Delete
                </>
              )}
            </button>
          )}
          <Link
            to="/admin"
            className="text-white h-min my-auto font-bold hover:opacity-50"
          >
            Cancel
          </Link>
        </div>
        <div className="flex gap-x-5 sm:ml-0 ml-auto">
          <button
            type="reset"
            onClick={resetFields}
            className="text-white h-min my-auto font-bold hover:opacity-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            className="flex justify-center whitespace-nowrap py-2 px-3 bg-[#3498DB] hover:opacity-80 text-white font-semibold focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save details
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
