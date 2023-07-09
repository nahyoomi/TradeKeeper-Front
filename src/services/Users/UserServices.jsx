import axios from "axios";

let URL_MAIN = "http://localhost:8080";

export const authUser = async (data) => {
    let URL = `${URL_MAIN}/api/auth/signin`;
    let response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
        "Access-Control-Allow-Origin": "*"
      }
    });
    const cookie = response.headers['set-cookie'];
    console.log("ko",cookie);
    return response;

  };
