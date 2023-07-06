import "./Toolbar.scss";

const Toolbar = () => {
  return (
    <div className="clearfix">
      <div>
        <label>Filter by:</label>
        <input type="text" />
      </div>
      <div>
        <button>Add an Item</button>
      </div>
    </div>
  );
};

export default Toolbar;
