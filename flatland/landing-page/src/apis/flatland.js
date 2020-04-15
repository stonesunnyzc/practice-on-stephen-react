import axios from "axios";

const wang = "https://10.131.234.7/automation-altiplano-ac";
const ccHZ = "https://10.182.105.192/nokia-altiplano-ac/";

export default axios.create({
    baseURL: wang
})