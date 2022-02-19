import { DMYorHM } from "../../utils/formatStrDate";

import PropTypes from "prop-types";
Columns.propTypes = { columns: PropTypes.object };

export default function Columns({ columns }) {
  return (
    <div>
      <h1>-Columns-</h1>
      <div>
        {columns.data?.map((column) => (
          <div key={column.columnId}>
            <div>---</div>
            <div>{column.category}</div>
            <div>{column.userName}</div>
            <div>{column.userProfile}</div>
            <div>{column.title}</div>
            <div>{DMYorHM(column.date)}</div>
            <div>{String(column.likey)}</div>
            <div>{column.likeyCnt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
