import axios from "axios";

const handleErrorResponse = (error) => {
  let errorResponse;
  if (error.response && error.response.data) {
    // I expect the API to handle error responses in valid format
    errorResponse = error.response.data;
    // JSON stringify if you need the json and use it later
  } else if (error.request) {
    // TO Handle the default error response for Network failure or 404 etc.,
    errorResponse = error.request.message || error.request.statusText;
  } else {
    errorResponse = error.message;
  }

  throw errorResponse;
};

export const getAllStudents = async () => {
  try {
    const { data } = await axios.get(`api/students`);
    return data;
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const addNewStudent = async (student) => {
  try {
    await axios.post(`api/students`, student);
    console.log("student added success.");
  } catch (error) {
    handleErrorResponse(error);
  }
};
