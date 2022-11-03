import Person from "./components/ProductList/Person";
import ProductList from "./components/ProductList/ProductList";

function App() {

  // async function getWish() {
  //   const query = new Parse.Query("Wish")
  //   // query.includeAll()
  //   try {
  //     const result = await query.get()
  //     console.log(result)
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // getWish()
  return (
    <div className="App">
      {/* <ProductList /> */}
      <Person />
      
    </div>
  );
}

export default App;
