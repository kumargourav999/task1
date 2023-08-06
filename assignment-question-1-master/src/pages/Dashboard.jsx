import { useState } from "react";



// Data
import mockData from "../assets/data.json";
import timeStamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";


const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const results = timeStamps.results;
  const length =results.length;
  const mergedData = mockData.results.map((item) => {
    const correspondingItem = timeStamps.results.find((data) => data["&id"] === item["&id"]);
    return { ...item, ...correspondingItem };
  });
  
  
   const [select,setselect]=useState();
 
   const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
   
   
   setInterval(() => {
    const selecteddata=JSON.parse(localStorage.getItem('selecteditem'));
  
    setSelectedOrderDetails(selecteddata);
    const selectedtimestamp=JSON.parse(localStorage.getItem('ordertimestamps'));
  
    setSelectedOrderTimeStamps(selectedtimestamp);

}, 1000);
  
  const filteredData = mergedData.filter((item) => {
  
  return item && item.uk && item.uk.toLowerCase().includes(searchText.toLowerCase());
});




  
x  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={length}/>
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
           />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
             cardData={selectedOrderDetails} title="Selected Order Details" />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredData} currency1={currency }   />
      </div>
    </div>
  );
}

export default Dashboard;
