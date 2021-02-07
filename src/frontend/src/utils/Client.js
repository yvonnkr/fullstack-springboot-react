import axios from "axios";

export const getAllStudents = async () => {
  try {
    const { data } = await axios.get(`api/students`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addNewStudent = async (student) => {
  try {
    await axios.post(`api/students`, student);
    console.log("student added success.");
  } catch (error) {
    console.log(error.message);
  }
};
