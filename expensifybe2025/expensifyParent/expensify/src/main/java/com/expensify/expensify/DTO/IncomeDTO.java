package com.expensify.expensify.DTO;

public class IncomeDTO {
    private String source;
    private int amount;
    private String emoji;
    private String date;
    private String userName;
    private Long id;

    // ✅ Default constructor (required for frameworks like Jackson, JPA, etc.)
    public IncomeDTO() {
    }

    // ✅ Parameterized constructor (handy when creating objects manually)
    public IncomeDTO(String source, int amount, String emoji, String date, String userName, Long id) {
        this.source = source;
        this.amount = amount;
        this.emoji = emoji;
        this.date = date;
        this.userName = userName;
        this.id = id;
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
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
    
    
}
