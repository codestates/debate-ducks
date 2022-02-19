import { useState } from "react";
import { Link } from "react-router-dom";
import { getColumns } from "../redux/modules/columns";
import useGetAsync from "../hooks/useGetAsync";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import checkPageValid from "../utils/checkPageValid";
import Banner from "../components/community/Banner";
import Category from "../components/community/Category";
import Like from "../components/community/Like";
import Search from "../components/community/Search";
import Sort from "../components/community/Sort";
import Columns from "../components/community/Columns";
import Page from "../components/community/Page";

export default function Community() {
  //! 임시 변수
  const userId = 1234;
  const lastPage = 100;

  // Category
  const [categories, setCategories] = useState([]);
  // Like
  const [isLiked, setIsLiked] = useState(false);
  // Search
  const search = useInput("", "");
  // Sort
  const options = ["Newest", "Oldest", "Most liked"];
  const sort = useSelect(options[0]);
  // Page
  const validatorInputPage = (value) => checkPageValid(value, lastPage);
  const validatorPage = (value) => value !== page.value;
  const page = useInput(1, 1, validatorInputPage, validatorPage);
  // Columns
  const columns = useGetAsync("columns", getColumns, { userId, categories: categories, isLiked: isLiked, searchValue: search.state, page: page.state, sort: sort.state });

  return (
    <div>
      <h1>-Community-</h1>
      <Banner userId={userId} />
      <Category categories={categories} setCategories={setCategories} />
      <Like isLiked={isLiked} setIsLiked={setIsLiked} />
      <div>
        <Link to="/create">CreateBtn</Link>
      </div>
      <Search search={search} />
      <Sort sort={sort} options={options} />
      <Columns columns={columns} />
      <Page page={page} lastPage={lastPage} />
    </div>
  );
}
