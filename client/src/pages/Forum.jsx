import { useState } from "react";
// import { Link } from "react-router-dom";
import { getDebates } from "../redux/modules/debates";
import useGetAsync from "../hooks/useGetAsync";
import useInput from "../hooks/useInput";
// import useSelect from "../hooks/useSelect";
import checkPageValid from "../utils/checkPageValid";
import Status from "../components/board/Status";
import Category from "../components/board/Category";
// import Like from "../components/board/Like";
import Search from "../components/board/Search";
import Debates from "../components/board/Debates";
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
  // const [isLiked, setIsLiked] = useState(false);
  // Search
  const search = useInput("", "");
  // Page
  const validatorInputPage = (value) => checkPageValid(value, lastPage);
  const validatorPage = (value) => value !== page.value;
  const page = useInput(1, 1, validatorInputPage, validatorPage);
  console.log(page.value, typeof page.value);
  // Debates
  const debates = useGetAsync("debates", getDebates, { userId, status: status, categories: categories, searchValue: search.state, page: page.state });

  // navigate
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/forum/create");
  };

  console.log(debates.data);
  return (
    <div>
      <div className="bg-forum bg-cover bg-center w-screen h-410 flex justify-center items-center">
        <div className="flex-col">
          <h1 className="font-poppins font-bold text-48 text-white text-center mb-36">Explore Debates</h1>
          <p className="text-center text-white mb-24">
            On-going 상태인 토론에서 상대를 확인하고 토론에 참여해 보세요
            <br />
            Voting 상태인 토론에서 찬성측 의견과 반대측 의견을 확인해 투표해 보세요
            <br />
            Completed 상태인 토론에서 최종 결과를 확인해 보세요
          </p>
          <Status status={status} setStatus={setStatus} />
        </div>
      </div>
      <h1 className="text-center mt-60 mb-40 text-24 font-bold capitalize">Categories</h1>
      <Category categories={categories} setCategories={setCategories} list={categoryList} />
      {/* <Like isLiked={isLiked} setIsLiked={setIsLiked} /> */}
      <div className="flex items-center justify-between w-1200 mx-auto">
        <OrangeBtn text="Create Debate" callback={handleCreateClick} />
        <Search search={search} />
      </div>
      <Debates debates={debates} />
      <Page page={page} lastPage={lastPage} />
    </div>
  );
}
