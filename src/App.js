
import Parse from 'parse'
// import ProductList from "./components/ProductList/ProductList";

function App() {

  
  return (
    <div className="App">
      {/* <ProductList /> */}
      <button onClick={() => console.log(Parse.User.current())}>Test</button>
    </div>
  );
}

export default App;
