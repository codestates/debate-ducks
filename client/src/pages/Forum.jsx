import { useState } from "react";
// import { Link } from "react-router-dom";
import { getDebates } from "../redux/modules/debates";
import useGetAsync from "../hooks/useGetAsync";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import checkPageValid from "../utils/checkPageValid";
import Status from "../components/board/Status";
import Category from "../components/board/Category";
import Like from "../components/board/Like";
import Search from "../components/board/Search";
import Sort from "../components/board/Sort";
// import Debates from "../components/board/Debates";
import Page from "../components/board/Page";
import { useSelector } from "react-redux";
import { OrangeBtn } from "../components/btn/BaseBtn";
import { useNavigate } from "react-router-dom";

export default function Forum() {
  //! 임시 변수
  const userId = useSelector((state) => state.user.data.id);
  const lastPage = 1000;

  // Status
  const [status, setStatus] = useState([]);
  // Category
  const [categories, setCategories] = useState([]);
  const categoryList = ["Politics", "Society", "Economics", "Science", "IT", "Environment", "Education", "History", "Sports", "Philosophy", "Culture", "Just For Fun"];
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

  // navigate
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/forum/create");
  };

  console.log(debates.data);
  return (
    <div>
      <Status status={status} setStatus={setStatus} />
      <Category categories={categories} setCategories={setCategories} list={categoryList} />
      <Like isLiked={isLiked} setIsLiked={setIsLiked} />
      {/* <Link to="/forum/create"></Link> */}
      <OrangeBtn text="Create Debate" callback={handleCreateClick} />
      <Search search={search} />
      <Sort sort={sort} options={options} />
      {/* <div>{debates}</div> */}
      {/* <Debates debates={debates} /> */}
      <Page page={page} lastPage={lastPage} />
    </div>
  );
}
