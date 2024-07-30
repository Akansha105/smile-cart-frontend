import { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
// import useDebounce from "hooks/useDebounce";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);
  const history = useHistory();
  // const debouncedSearchKey = useDebounce(searchKey);
  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    setSearchKey(value);

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  const [searchKey, setSearchKey] = useState(searchTerm);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );

  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        shouldShowBackButton={false}
        title="Smile cart"
        actionBlock={
          <Input
            placeholder="Search"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={({ target: { value } }) => {
              updateQueryParams(value);
              setSearchKey(value);
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default withTitle(ProductList);
