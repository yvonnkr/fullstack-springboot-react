package com.yvolabs.fullstack.student;

import com.yvolabs.fullstack.exception.ApiRequestException;
import com.yvolabs.fullstack.validate.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {
    private final StudentDataAccessService studentDataAccessService;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService, EmailValidator emailValidator) {
        this.studentDataAccessService = studentDataAccessService;
        this.emailValidator = emailValidator;
    }

    List<Student> getAllStudents(){

        return studentDataAccessService.selectAllStudents();
    }

    void addNewStudent(Student student) {
        addNewStudent(null,student);
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId)
                .orElse(UUID.randomUUID());

        String email = student.getEmail();

        if(!emailValidator.test(email)){
            throw new ApiRequestException(email + " is not a valid email");
        }

        if(studentDataAccessService.isEmailTaken(email)){
            throw new ApiRequestException(email + " is taken");
        }

        studentDataAccessService.insertStudent(newStudentId, student);
    }
}
