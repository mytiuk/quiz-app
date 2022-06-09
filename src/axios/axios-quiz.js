import axios from "axios";

export default axios.create({
  baseURL: 'https://quiz-app-64a71-default-rtdb.europe-west1.firebasedatabase.app/'
})