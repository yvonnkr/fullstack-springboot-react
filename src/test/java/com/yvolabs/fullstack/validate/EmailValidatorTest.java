package com.yvolabs.fullstack.validate;


import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;


class EmailValidatorTest {
    private final EmailValidator underTest = new EmailValidator();

    @Test
    void itShouldValidateCorrectEmail() {
        assertThat(underTest.test("hello@gmai.com")).isTrue();
    }

    @Test
    void itShouldValidateAnInCorrectEmail(){
        assertThat(underTest.test("hellogmail.com")).isFalse();
    }

    @Test
    void itShouldValidateAnInCorrectEmailWithoutDotAtTheEnd(){
        assertThat(underTest.test("hello@gmail")).isFalse();
    }
}