package com.oop11.kombat_backend.Games.Player;

import lombok.Getter;

@Getter
public class Budget
{
	private final double turnBudget;
	private final double maxBudget;
	private final double baseInterestRatePercentage;

	private double budget;

	public int currentTurn;

	public Budget(double initBudget, double turnBudget, double maxBudget, double baseInterestRatePercentage)
	{
		this.turnBudget = turnBudget;
		this.maxBudget = maxBudget;
		this.baseInterestRatePercentage = baseInterestRatePercentage;

		budget = initBudget;
		currentTurn = 0;
	}

	/**
	 * gain budget according to design doc.
	 * @param turn
	 */
	public void income(int turn)
	{
		currentTurn = turn;

		budget += turnBudget + interest();

		//limit max budget
		if (budget > maxBudget) budget = maxBudget;
	}

	private double interest() {return budget < 1 ? 0 : budget * getInterestRatePercentage() / 100;}

	public double getInterestRatePercentage()
	{
		double log10Budget = budget < 1 ? 0 : Math.log10(budget);
		double lnTurn = currentTurn < 1 ? 0 : Math.log(currentTurn);

		return baseInterestRatePercentage * log10Budget * lnTurn;
	}
	/**
	 * have enough budget for this price
	 * @param price price >= 0
	 * @return have enough budget
	 */
	public boolean enough(int price)
	{
		return this.budget >= price;
	}

	/**
	 * pay [price] budget if enough
	 * @param price price >= 0
	 * @return pay success
	 */
	public boolean pay(int price)
	{
		if (enough(price))
		{
			budget -= price;
			return true;
		}
		return false;
	}
}
