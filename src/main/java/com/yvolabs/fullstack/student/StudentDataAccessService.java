package com.yvolabs.fullstack.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class StudentDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents() {
        String sql = String.format("SELECT  student_id,  first_name,  last_name,  email,  gender FROM student");

        List<Student> students = jdbcTemplate.query(sql, mapStudentFromDb());

        return students;

    }

    public List<StudentCourse> selectAllCoursesForStudent(UUID studentId) {
        String sql = String.format("SELECT * FROM student JOIN student_course USING(student_id) JOIN course USING(course_id) WHERE student_id = '%s'", studentId);

        List<StudentCourse> studentCourses = jdbcTemplate.query(sql, mapStudentCourseFromDb());

        return studentCourses;
    }

    public int insertStudent(UUID studentId, Student student) {
        String sql = String.format("INSERT INTO student (student_id, first_name, last_name, email, gender) VALUES (?, ?, ?, ?, ?::gender)");

        return jdbcTemplate.update(
                sql,
                studentId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase()
        );
    }

    @SuppressWarnings("ConstantConditions")
    boolean isEmailTaken(String email) {
        String sql = String.format("SELECT EXISTS ( SELECT 1 FROM student WHERE email = ?)");


        return jdbcTemplate.queryForObject(
                sql,
                (resultSet, i) -> resultSet.getBoolean(1),
                email
        );
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);

            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");

            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);

            return new Student(
                    studentId,
                    firstName,
                    lastName,
                    email,
                    gender
            );
        };
    }

    private RowMapper<StudentCourse> mapStudentCourseFromDb() {
        return (resultSet, i) -> {
            Integer grade = Optional.ofNullable(resultSet.getString("grade"))
                    .map(g -> Integer.parseInt(g))
                    .orElse(null);


            return new StudentCourse(
                    UUID.fromString(resultSet.getString("student_id")),
                    UUID.fromString(resultSet.getString("course_id")),
                    resultSet.getString("name"),
                    resultSet.getString("description"),
                    resultSet.getString("department"),
                    resultSet.getString("teacher_name"),
                    resultSet.getDate("start_date").toLocalDate(),
                    resultSet.getDate("end_date").toLocalDate(),
                    grade
            );
        };
    }


}
