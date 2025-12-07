package com.expensify.expensify.DTO;

public class ExpenseDTO {
	 private String source;
	    private int amount;
	    private String emoji;
	    private String date;
	    private String userName;
	    private Long Id;
	    private Boolean isRecurring;
	    // ✅ Default constructor (required for frameworks like Jackson, JPA, etc.)
	    public ExpenseDTO() {
	    }

	    // ✅ Parameterized constructor (handy when creating objects manually)
	    public ExpenseDTO(String source, int amount, String emoji, String date, String userName,Long Id, Boolean isRecurring) {
	        this.source = source;
	        this.amount = amount;
	        this.emoji = emoji;
	        this.date = date;
	        this.userName = userName;
	        this.Id = Id;
	        this.isRecurring = isRecurring;
	    }

	    // ✅ Getters and Setters
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

		public Long getId() {
			return Id;
		}

		public void setId(Long id) {
			Id = id;
		}

		public Boolean getIsRecurring() {
			return isRecurring;
		}

		public void setIsRecurring(Boolean isRecurring) {
			this.isRecurring = isRecurring;
		}
		
	    
	    
}
