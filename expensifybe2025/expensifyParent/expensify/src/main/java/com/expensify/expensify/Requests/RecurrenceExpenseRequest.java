package com.expensify.expensify.Requests;

public class RecurrenceExpenseRequest {

	private String source;
	private int amount;
	private String emoji;
	private String date;
	private String userName;
	private Boolean isRecurring;
	
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getEmoji() {
		return emoji;
	}
	public void setEmoji(String emoji) {
		this.emoji = emoji;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Boolean getIsRecurring() {
		return isRecurring;
	}
	public void setIsRecurring(Boolean isRecurring) {
		this.isRecurring = isRecurring;
	}
	

}
