import axios, { AxiosResponse } from "axios";

const URL: string = "https://speech-main-be.onrender.com";

export const createUser = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-user`, data)
      .then((res: AxiosResponse<any, any>) => {
        return res.data?.data;
      });
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const sendMails = async (ID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/send-emails/${ID}`, data)
      .then((res: AxiosResponse<any, any>) => {
        return res.data?.data;
      });
  } catch (error) {
    console.log(error);

    return error;
  }
};
export const getOne = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/get-one`, data)
      .then((res: AxiosResponse<any, any>) => {
        console.log(res);

        return res.data?.data;
      });
  } catch (error) {
    console.log(error);

    return error;
  }
};
