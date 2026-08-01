import { ClipLoader } from "react-spinners";
import "./LoadingOverlay.css";

export default function LoadingOverlay({loading,message}){

    if(!loading){
        return null;
    }
        return (
        <div className="loading-overlay">
            <div className="loading-content">

                <ClipLoader
                    size={45}
                    color="#fe424d"
                />

                <h5>{message}</h5>

                <p>Please wait a moment...</p>

            </div>
        </div>
    );
}