import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows,currency1 }) => {
  const handleRowClick = (rowData) => {
    localStorage.setItem("selecteditem",JSON.stringify({"buySellIndicatorrowData":rowData.executionDetails.buySellIndicator,"orderStatus":rowData.executionDetails.orderStatus ,
    "orderType":rowData.executionDetails.orderType}));
    localStorage.setItem("ordertimestamps",JSON.stringify({"orderReceived": rowData.timestamps.orderReceived,"orderStatusUpdated":rowData.timestamps.orderStatusUpdated,"orderSubmitted": rowData.timestamps.orderSubmitted}));

    console.log("Selected row data:", rowData);
  };
  
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
        <ListHeaderCell>Order number</ListHeaderCell>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency1}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
      {rows.map((row, index) => (
          <ListRow key={index} onClick={() => handleRowClick(row)}>
            <ListRowCell>{row.uk}</ListRowCell>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{row.timestamps.orderSubmitted}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[currency1]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
