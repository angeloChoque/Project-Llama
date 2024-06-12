const prod = {
    API_URL: "https://project-llama.onrender.com",
  }
  
  const dev = {
    API_URL: "http://localhost:5001",
  }
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod