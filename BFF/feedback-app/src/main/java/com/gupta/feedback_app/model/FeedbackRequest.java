package com.gupta.feedback_app.model;

import lombok.Data;

@Data
public class FeedbackRequest {
	
	private Long userId;
    
	private String title;
    
	private String content;
    
	private Integer rating;
}
