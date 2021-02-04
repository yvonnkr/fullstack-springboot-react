package com.yvolabs.fullstack.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static com.yvolabs.fullstack.student.Student.Gender;


@RestController
@RequestMapping("students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents(){
        return List.of(
                new Student(UUID.randomUUID(),"John","Doe", "johndoe@gmail.com", Gender.MALE),
                new Student(UUID.randomUUID(),"Jane","Doe", "janedoe@gmail.com", Gender.FEMALE),
                new Student(UUID.randomUUID(),"Steve","Smith", "stevesmith@gmail.com", Gender.MALE),
                new Student(UUID.randomUUID(),"Mary","Smith", "marysmith@gmail.com", Gender.FEMALE)
        );
    }
}
