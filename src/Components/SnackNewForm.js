import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;


function SnackNewForm(){

  const [snack, setSnack] = useState([{
    name: '',
    fiber: "",
    protein: "",
    added_sugar: "",
   is_healthy: false,
   selected: false,
   bookmarked: false,
   image: "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
  }]);


  const remove = (form) => {
    const filter = snack.filter((s) => s !== form);
    setSnack(filter);
  };

  let navigate = useNavigate();

  const addSnack = (newSnack) => {
    axios
      .post(`${API}/snacks`, newSnack)
      .then(
        () => {
          navigate(`/snacks`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (i, e, s) => {
    let temp = [...snack];
    temp[i][s] = e.target.value;
    setSnack(temp);
  };

  const handleCheckboxChange = () => {
    setSnack({ ...snack, is_healthy: !snack.is_healthy });
  };


const newRow = () => {
  setSnack([...snack, {
    name: '',
    fiber: "",
    protein: "",
    added_sugar: "",
   is_healthy: false,
   selected: false,
   bookmarked: false,
   image: "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
  }])
}

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < snack.length; i++) {
      addSnack(snack[i]);
    }
  };


  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
       {snack.map((x, i) => {
        return(
        <div>
          <button onClick={() => remove(x)}>Remove</button>
          <label htmlFor='name'>Name: </label>
          <input
          type="text"
          id="name"
          onChange={(e) => handleTextChange(i, e, 'name')}
          value={x?.name}
          />
          <label htmlFor='fiber'>Fiber: </label>
          <input
          type="number"
          min="0"
          id="fiber"
          onChange={(e) => handleTextChange(i, e, 'fiber')}
          value={x?.fiber}
          />
          <label htmlFor='protein'>Protein: </label>
          <input
          type="number"
          min="0"
          id="protein"
          onChange={(e) => handleTextChange(i, e, 'protein')}
          value={x?.protein}
          />
          <label htmlFor='added_sugar'>Sugar: </label>
          <input
          type="number"
          min="0"
          id="added_sugar"
          onChange={(e) => handleTextChange(i, e, 'added_sugar')}
          value={x?.added_sugar}
          />
          <label htmlFor='image'>Image: </label>
          <input
          pattern="http[s]*://.+"
          required
          value={x?.image}
          placeholder="http://"
          onChange={(e) => handleTextChange(i, e, 'image')}
          />
          <label htmlFor="is_healthy">Healthy:</label>
          <input
          id="is_healthy"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={snack.is_healthy}
          />
        </div>
        )
       })}
      </form>
    </div>
  );
}

export default SnackNewForm;
