import axios from "axios";
import { useEffect, useState } from "react";
import { OrangeBtn } from "../components/btn/BaseBtn";
import ConfirmModal from "../components/modal/ConfirmModal";
import Sort from "../components/board/Sort";
import useSelect from "../hooks/useSelect";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export default function EditColumn() {
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [columnInfo, setColumnInfo] = useState("");
  const column_id = useParams();
  const numColumnId = parseInt(column_id.columnId);

  // 해당 column 정보 get
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/column/single/${numColumnId}`)
      .then((res) => {
        console.log(res.data.data);
        setColumnInfo(res.data.data);
      })
      .catch((err) => err);
  }, []);

  // title수정
  const [inputTitle, setInputTitle] = useState(columnInfo.title);
  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  // topic수정
  const [inputTopic, setInputTopic] = useState(columnInfo.contents);
  const handleInputTopic = (e) => {
    setInputTopic(e.target.value);
  };

  //category수정
  const options = ["Politics", "Society", "Economics", "Science", "IT", "Environment", "Education", "History", "Sports", "Philosophy", "ForFun"];
  const sort = useSelect(options[0]);

  // category 옆 change버튼 눌렀을 때 나타나는 Modal
  const [isOpenSort, setIsOpenSort] = useState(false);
  const openSort = () => {
    setIsOpenSort(true);
  };

  //confirmModal 오픈
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(true);
  };

  // 최종 save
  const handleSubmit = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/column/${numColumnId}`, {
        category: sort.attribute.value,
        title: inputTitle,
        contents: inputTopic,
      })
      .then((res) => {
        console.log(res.data.data.id);
        navigate(`/community/column/${res.data.data.id}`);
      })
      .catch((err) => err);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold mr-20">Title</div>
      <textarea className="w-304 h-32" defaultValue={columnInfo.title} value={inputTitle} onChange={handleInputTitle}></textarea>
      <div className="text-ducks-gray-666">Author : {userInfo?.data.name}</div>
      <div className="font-bold mt-30">Contents </div>{" "}
      <div className="flex flex-row">
        <div className="m-12">Category: {columnInfo.category}</div>
        <OrangeBtn callback={openSort} text="Change"></OrangeBtn>
      </div>
      {isOpenSort ? <Sort sort={sort} options={options}></Sort> : null}
      <textarea className="w-304 h-304" defaultValue={columnInfo.contents} value={inputTopic} onChange={handleInputTopic}></textarea>
      <OrangeBtn callback={openModalHandler} text="Save"></OrangeBtn>
      {isOpen ? (
        <ConfirmModal
          content={{ title: "Confirm", text: "Do you want to save this column?", left: "NO", right: "YES" }}
          cancelCallback={() => {
            setIsOpen(false);
          }}
          confirmCallback={handleSubmit}
        />
      ) : null}
    </div>
  );
}
