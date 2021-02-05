package com.yvolabs.fullstack.student;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.yvolabs.fullstack.student.Student.Gender.FEMALE;
import static com.yvolabs.fullstack.student.Student.Gender.MALE;

@Repository
public class StudentDataAccessService {
    public List<Student> selectAllStudents(){
        return List.of(
                new Student(UUID.randomUUID(),"Johnxxxxxyyyy","Doe", "johndoe@gmail.com", MALE),
                new Student(UUID.randomUUID(),"Jane","Doe", "janedoe@gmail.com", FEMALE),
                new Student(UUID.randomUUID(),"Steve","Smith", "stevesmith@gmail.com", MALE),
                new Student(UUID.randomUUID(),"Mary","Smith", "marysmith@gmail.com", FEMALE)
        );
    }
}
