import AddBook from "./component/AddBook";
import BookComponent from "./component/BookComponent"
import { Routes, Route } from 'react-router'
import BookDetails from "./component/detailBook";


function App() {
  return (
    <div className="main">
      {
        <Routes>
          <Route path="/" element={<>
          <h1>The Home Page</h1>
          <BookComponent />
            <AddBook /></>} />
          <Route path="/:id" element={<><BookDetails /></>} />
        </Routes>
      }

    </div>
  );
}

export default App;
