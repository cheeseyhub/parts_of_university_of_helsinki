import { setFilter } from "../reducers/filter";
import { useDispatch } from "react-redux";
const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    event.preventDefault();
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue));
  };

  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter: <input onChange={handleFilter} />
    </div>
  );
};
export default Filter;
