import "./Card.css";
export default function Card({
    image,
    title,
    price,
    propertyType,
    gender,
    college,
    location,
    amenities = []
}) {
    return (
        <div className="campus-card">
            {/* Property Image */}
            <div className="campus-card-image">
                <img
                    src={image}
                    alt={title}
                />
                {/* Property Type Badge */}
                {propertyType && (
                    <span className="property-badge">
                        {propertyType}
                    </span>
                )}
            </div>
            {/* Card Content */}
            <div className="campus-card-body">
                {/* Title */}
                <h5 className="campus-card-title">
                    {title}
                </h5>
                {/* Location */}
                <p className="campus-card-location">
                    <i className="fa-solid fa-location-dot"></i>
                    {location}
                </p>
                {/* College */}
                {college && (
                    <p className="campus-card-college">
                        <i className="fa-solid fa-graduation-cap"></i>
                        Near {college}
                    </p>
                )}
                {/* Property Information */}
                <div className="campus-card-info">
                    {gender && (
                        <span>
                            <i className="fa-solid fa-users"></i>
                            {gender}
                        </span>
                    )}
                    {amenities.includes("WiFi") && (
                        <span>
                            <i className="fa-solid fa-wifi"></i>
                            WiFi
                        </span>
                    )}
                </div>
                {/* Price */}
                <div className="campus-card-footer">
                    <div>
                        <strong>
                            ₹{price?.toLocaleString("en-IN")}
                        </strong>
                        <span>/month</span>
                    </div>
                    <i className="fa-solid fa-arrow-right card-arrow"></i>
                </div>
            </div>
        </div>
    );
}