import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { ITEMS_PER_PAGE } from "../../../components/constants";
import Pagination from "./../../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchProductByQueryAsync,
  clearProductOnChange,
  selectProductLoading,
  selectFilterLoading,
  fetchAllFilterAsync,
  selectAllProducts,
  selectTotalItems,
  selectFilters,
} from "../../product/productSlice";
import {
  formatPriceInINR,
  discountedPrice,
} from "../../../components/Functions";

// Icons
import { AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { PiSquaresFourBold } from "react-icons/pi";
import Rating from "../../../components/Rating";
import NoData from "../../../components/NoData";
import { RxCross2 } from "react-icons/rx";
import { BsFunnel } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import Skeleton from "../../../components/loading/Skeleton";

const sortOptions = [
  { id: "bestRating", name: "Best Rating", sort: "rating", order: "desc" },
  {
    id: "priceLowToHigh",
    name: "Price: Low to High",
    sort: "price",
    order: "asc",
  },
  {
    id: "priceHighToLow",
    name: "Price: High to Low",
    sort: "price",
    order: "desc",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({});
  const loadingProduct = useSelector(selectProductLoading);
  const loadingFilter = useSelector(selectFilterLoading);
  const [selectedSort, setSelectedSort] = useState({});
  const [selectedPage, setSelectedPage] = useState(1);
  const totalItems = useSelector(selectTotalItems);
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handlePage = (pageNo) => {
    setSelectedQuery({
      ...selectedQuery,
      _page: { [pageNo]: true },
      _limit: { [ITEMS_PER_PAGE]: true },
    });
    setSelectedPage(pageNo);
  };

  const handleFilterChange = (e, section, option) => {
    const { checked } = e.target;
    setSelectedQuery({
      ...selectedQuery,
      [section.id]: {
        ...selectedQuery[section.id],
        [option.value]: checked,
      },
    });
    setSelectedFilter((prev) => ({
      ...prev,
      [section.id]: {
        ...selectedQuery[section.id],
        [option.value]: checked,
      },
    }));
  };

  const handleSortChange = (option) => {
    setSelectedQuery({
      ...selectedQuery,
      _sort: { [option.sort]: true },
      _order: { [option.order]: true },
    });
    setSelectedSort(option.id);
  };

  useEffect(() => {
    handlePage(1);
  }, [selectedFilter, selectedSort]);

  useEffect(() => {
    if (selectedQuery !== null) {
      dispatch(fetchProductByQueryAsync(selectedQuery));
    }
  }, [dispatch, selectedQuery]);

  useEffect(() => {
    dispatch(fetchAllFilterAsync());
    dispatch(clearProductOnChange());
  }, [dispatch]);

  return (
    <div className="w-full md:w-11/12">
      {filters && (
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          filters={filters}
          setMobileFiltersOpen={setMobileFiltersOpen}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
      )}

      <main className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-9 items-baseline justify-between border-b border-gray-200">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            All Products
          </h1>

          <div className="flex gap-4 items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium hover">
                  Sort
                  <AiOutlineDown
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-20 right-0 mt-2 w-40 origin-top-right bg-[#333333] shadow-2xl">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {() => (
                          <div
                            className={classNames(
                              "block px-4 py-2 text-sm text-white cursor-pointer",
                              selectedSort === option.id
                                ? "opacity-100"
                                : "opacity-70"
                            )}
                            onClick={() => handleSortChange(option)}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button type="button" className="p-2 hover:text-gray-500">
              <PiSquaresFourBold className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="p-2 hover:text-gray-500 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <BsFunnel className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {filters && (
              <DesktopFilter
                selectedFilter={selectedFilter}
                loading={loadingFilter}
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
            )}

            <ProductGrid products={products} loading={loadingProduct} />
          </div>
          <Pagination
            totalItems={totalItems}
            selectedPage={selectedPage}
            handlePage={handlePage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          />
        </section>
      </main>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  selectedFilter,
  handleFilterChange,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-12 shadow-xl bg-[#333333] text-white">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-2xl font-medium">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center p-2 "
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <RxCross2 className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3  hover:text-gray-500">
                            <span className="text-xl font-medium">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <BiMinus
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <AiOutlinePlus
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={
                                    selectedFilter[section.id]?.[
                                      option.value
                                    ] || false
                                  }
                                  onChange={(e) =>
                                    handleFilterChange(e, section, option)
                                  }
                                  className="hover:cursor-pointer h-4 w-4 checked:border-white text-[#3498DB] focus:ring-[#3498DB]"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="hover:cursor-pointer ml-3 min-w-0 flex-1"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
function DesktopFilter({
  selectedFilter,
  handleFilterChange,
  filters,
  loading,
}) {
  return (
    <form className="hidden lg:block">
      {!loading ? (
        <>
          {filters.map((section) => (
            <Disclosure
              as="div"
              key={section.id}
              className="border-b border-gray-200 py-6"
            >
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm  hover:text-gray-500">
                      <span className="font-medium">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <BiMinus className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <AiOutlinePlus
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            checked={
                              selectedFilter[section.id]?.[option.value] ||
                              false
                            }
                            onChange={(e) =>
                              handleFilterChange(e, section, option)
                            }
                            className="hover:cursor-pointer h-4 w-4 text-[#3498DB] focus:ring-[#3498DB] checked:border-white"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="hover:cursor-pointer ml-3 text-sm"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </>
      ) : (
        <Skeleton count={2} />
      )}
    </form>
  );
}
function ProductGrid({ products, loading }) {
  return (
    <div className="bg-[#333333] px-4 py-6 sm:px-6 lg:col-span-3">
      <Link
        to="/admin/product-form"
        className="mb-6 w-fit flex px-5 justify-center border bg-[#E74C3C] text-white py-3 font-bold hover:opacity-80"
      >
        + Add Product
      </Link>
      {!loading && products.length === 0 ? (
        <NoData color={"#1A1A1A"}>No Data found.</NoData>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
          {loading ? (
            <Skeleton image={true} count={6} />
          ) : (
            <>
              {products.map((product) => (
                <div className="flex flex-col justify-between gap-3">
                  <Link
                    to={"/product-detail/" + product.id}
                    key={product.id}
                    className="relative hover:opacity-70"
                  >
                    <div className="absolute -translate-x-1 -translate-y-1 flex text-sm font-bold text-white bg-[#E74C3C] justify-center z-10 p-1">
                      <span className="my-auto">
                        {product.discountPercentage}% off
                      </span>
                    </div>
                    {product.deleted && (
                      <div className="absolute w-full h-full justify-center items-center flex text-[#E74C3C] backdrop-blur-[2px] font-extrabold z-20">
                        <div className="-rotate-45 text-3xl -translate-y-1/2">
                          Product Deleted
                        </div>
                      </div>
                    )}

                    <div className="aspect-h-5 aspect-w-4">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-4 flex gap-2 justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base text-gray-200 font-bold">
                          <div>{product.title}</div>
                        </h3>
                        <Rating rating={product.rating} />
                        <p className="mt-1 flex text-sm text-gray-300">
                          {product.stock < 50 && product.stock > 0
                            ? `Only ${product.stock} left.`
                            : ""}
                          {product.stock === 0 ? `Product out of stock.` : ""}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className=" whitespace-nowrap text-sm font-bold line-through text-gray-400">
                          {formatPriceInINR(product.price)}
                        </p>
                        <p className=" whitespace-nowrap text-sm font-bold text-gray-200">
                          {discountedPrice(
                            product.price,
                            product.discountPercentage
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={"/admin/product-form/edit/" + product.id}
                    className="mb-6 px-5 justify-center border bg-[#3498DB] text-center text-white py-3 font-bold hover:opacity-80"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
