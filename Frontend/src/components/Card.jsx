import "./Card.css";

export default function Card({image,title,price}){
    return (
        <>
        <div className="card col">
        <img src={image} className="card-img-top" alt="listing image"/>
        <div className="card-img-overlay"></div>
        <div className="card-body">
        <p className="card-text">
            <b>{title}</b> <br/>
            {`\u20B9`}{price?.toLocaleString("en-IN")}/ night
        </p>
        </div>
    </div>
        </>
    )
};