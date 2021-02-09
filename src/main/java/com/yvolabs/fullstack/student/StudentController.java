package com.yvolabs.fullstack.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("api/students")
//@CrossOrigin("http://localhost:3000")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();
    }

    @GetMapping("{studentId}/courses")
    public List<StudentCourse> getAllCoursesForStudent(@PathVariable("studentId") UUID studentId){
       return studentService.getAllCoursesForStudent(studentId);

    }


    @PostMapping
    public void addNewStudent(@RequestBody @Valid Student student) {
        studentService.addNewStudent(student);
    }


}
