import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  console.log(data); // أضف هذا للتحقق من البيانات

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : error ? (
        "Error occurred"
      ) : (
        <>
          {Array.isArray(data) ? (
            data.map((item) => (
              <div className="fpItem" key={item._id}>
                <img
                  src={item.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                {item.rating && <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>}
              </div>
            ))
          ) : (
            "No data available"
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
