import PropTypes from "prop-types";
Page.propTypes = { page: PropTypes.object, lastPage: PropTypes.number };

export default function Page({ page, lastPage }) {
  const movePage = (num) => {
    if (num !== page.state && num >= 1 && num <= lastPage) {
      page.setInput(num);
      page.setState(num);
    }
  };

  return (
    <div>
      <h1>-Page-</h1>
      <div>
        <input {...page.attribute} placeholder={page.state} /> / {lastPage}
      </div>
      <button onClick={() => movePage(1)}>first</button>
      <button onClick={() => movePage(page.state - 1)}>next</button>
      <button onClick={() => movePage(page.state + 1)}>prev</button>
      <button onClick={() => movePage(lastPage)}>last</button>
    </div>
  );
}
