import axios from "axios";

export const getAllStudents = async () => {
  try {
    const { data } = await axios.get(`api/students`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
