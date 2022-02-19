import { useState } from "react";
import { Link } from "react-router-dom";
import { getDebates } from "../redux/modules/debates";
import useGetAsync from "../hooks/useGetAsync";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import checkPageValid from "../utils/checkPageValid";
import Banner from "../components/board/ForumBanner";
import Status from "../components/board/Status";
import Category from "../components/board/Category";
import Like from "../components/board/Like";
import Search from "../components/board/Search";
import Sort from "../components/board/Sort";
import Debates from "../components/board/Debates";
import Page from "../components/board/Page";

export default function Forum() {
  //! 임시 변수
  const userId = 5678;
  const lastPage = 1000;

  // Status
  const [status, setStatus] = useState([]);
  // Category
  const [categories, setCategories] = useState([]);
  const categoryList = ["Test1", "Test2", "Test3", "Test4", "Test5", "Test6", "Test7", "Test8", "Test9"];
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
  // Debates
  const debates = useGetAsync("debates", getDebates, { userId, status: status, categories: categories, isLiked: isLiked, searchValue: search.state, page: page.state, sort: sort.state });

  return (
    <div>
      <h1>-Forum-</h1>
      <Banner userId={userId} />
      <Status status={status} setStatus={setStatus} />
      <Category categories={categories} setCategories={setCategories} list={categoryList} />
      <Like isLiked={isLiked} setIsLiked={setIsLiked} />
      <div>
        <Link to="/forum/create">CreateBtn</Link>
      </div>
      <Search search={search} />
      <Sort sort={sort} options={options} />
      <Debates debates={debates} />
      <Page page={page} lastPage={lastPage} />
    </div>
  );
}
