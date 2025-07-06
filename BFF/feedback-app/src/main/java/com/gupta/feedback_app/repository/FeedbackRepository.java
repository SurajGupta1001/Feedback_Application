package com.gupta.feedback_app.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gupta.feedback_app.entity.Feedback;

public interface FeedbackRepository extends CrudRepository<Feedback, Long> {

	List<Feedback> findByUser_Id(Long userId);

}
