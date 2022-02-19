import { useState } from "react";
import { Link } from "react-router-dom";
import { getColumns } from "../redux/modules/columns";
import useGetAsync from "../hooks/useGetAsync";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import checkPageValid from "../utils/checkPageValid";
import CommunityBanner from "../components/board/CommunityBanner";
import Category from "../components/board/Category";
import Like from "../components/board/Like";
import Search from "../components/board/Search";
import Sort from "../components/board/Sort";
import Columns from "../components/board/Columns";
import Page from "../components/board/Page";

export default function Community() {
  //! 임시 변수
  const userId = 1234;
  const lastPage = 100;

  // Category
  const [categories, setCategories] = useState([]);
  const categoryList = ["General", "Notice", "Discussion", "Essay"];
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
      <CommunityBanner userId={userId} />
      <Category categories={categories} setCategories={setCategories} list={categoryList} />
      <Like isLiked={isLiked} setIsLiked={setIsLiked} />
      <div>
        <Link to="/community/create">CreateBtn</Link>
      </div>
      <Search search={search} />
      <Sort sort={sort} options={options} />
      <Columns columns={columns} />
      <Page page={page} lastPage={lastPage} />
    </div>
  );
}
