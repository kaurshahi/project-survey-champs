
import './App.css'

function App() {


  return (
<div>
      <h2>Change Product Description</h2>
      <div>
        <label htmlFor="productId" className="mx-5">Product ID:</label>
        <input
          type="text"
          id="productId"

          className="border-black border rounded-lg py-2 my-3"

        />
      </div>
      <div >
        <label htmlFor="newDescription" className="mx-5">New Description:</label>
        <input
          type="text"
          id="newDescription"

          className="border-black border rounded-lg py-2 my-3"

        />
      </div>
      <button >Update Description</button>

    </div>
  );
}

export default App
