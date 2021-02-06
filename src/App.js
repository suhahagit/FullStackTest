import './App.css';
import RestaurantsTable from "./components/RestaurantsTable"
import UploadFile from "./components/UploadFile"

function App() {
  return (
    <div className="App">
      <UploadFile/>
      <RestaurantsTable />
    </div>
  );
}

export default App;
