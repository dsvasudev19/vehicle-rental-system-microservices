package com.project.payment_service.controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.payment_service.entity.Transaction;
import com.project.payment_service.models.TransactionPojo;
import com.project.payment_service.service.TransactionService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payment")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@Autowired
	RazorpayClient razorpay;

	@GetMapping("/greet")
	public String greetMessage() {
		return "Hello....Payment!";
	}

	@PostMapping("/create-order")
	public ResponseEntity<?> createNewTransaction(@RequestBody Transaction transaction) throws RazorpayException {

		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", transaction.getAmount());
		orderRequest.put("currency", "INR");
//		orderRequest.put("receipt", "receipt#1");
		JSONObject notes = new JSONObject();
//		notes.put("notes_key_1", "Tea, Earl Grey, Hot");
//		orderRequest.put("notes", notes);

		Order order = razorpay.orders.create(orderRequest);
		transaction.setStatus(order.get("status"));
		transaction.setOrderId(order.get("id"));
		if (order.get("status").equals("created")) {

			transactionService.createTransaction(transaction);
		}
		System.out.println(order);

		return new ResponseEntity<>(transaction, HttpStatus.OK);
	}

	public ResponseEntity<?> getAllTransactions() {
		return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
	}

	public ResponseEntity<?> getTransactionById(@PathVariable long id) {
		TransactionPojo transactionPojo = transactionService.getTransactionById(id);
		if (transactionPojo != null) {
			return new ResponseEntity<>(transactionPojo, HttpStatus.OK);
		}
		return ResponseEntity.noContent().build();
	}
}
