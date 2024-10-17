package com.project.payment_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.payment_service.entity.Transaction;
import com.project.payment_service.models.TransactionPojo;
import com.project.payment_service.repository.TransactionRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	public List<TransactionPojo> getAllTransactions() {
		List<Transaction> transactions = transactionRepository.findAll();
		List<TransactionPojo> pojos = new ArrayList<>();
		transactions.stream().forEach(transaction -> {
			TransactionPojo pojo = new TransactionPojo();
			BeanUtils.copyProperties(transaction, pojo);
			pojos.add(pojo);
		});
		return pojos;
	}

	public TransactionPojo getTransactionById(long id) {
		Optional<Transaction> transactionFound = transactionRepository.findById(id);
		if (transactionFound.isPresent()) {
			TransactionPojo pojo = new TransactionPojo();
			BeanUtils.copyProperties(transactionFound.get(), pojo);
			return pojo;
		}
		return null;
	}
	
	public TransactionPojo createTransaction(Transaction transaction) {
		Transaction transactionCreated=transactionRepository.save(transaction);
		TransactionPojo pojo=new TransactionPojo();
		BeanUtils.copyProperties(transactionCreated, pojo);
		return pojo;
	}

}
