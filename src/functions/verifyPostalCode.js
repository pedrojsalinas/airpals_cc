import { codes } from "../utils/allowCodes";

const verifyPostalCode = (code) => {
    const result = codes.find(pc => pc === code)
    return result !== undefined;
};

export default verifyPostalCode;