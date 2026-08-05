const API_URL = import.meta.env.PROD
    ? "/api"
    : "http://localhost:8080";

export default API_URL;