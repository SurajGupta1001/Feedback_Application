package com.gupta.feedback_app.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ChangePasswordRequest {
	String email;
	LocalDate dob;
	String newPassword;
}
