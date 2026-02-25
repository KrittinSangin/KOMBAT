package com.oop11.kombat_backend.Games.Player;

import com.oop11.kombat_backend.Games.Configs.Config;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class Budget
{
	private final double turnBudget;
	private final double maxBudget;
	private final double baseInterestRatePercentage;

	private double budget;
	private double interestRatePercentage;

	public Budget(double initBudget, double turnBudget, double maxBudget, double baseInterestRatePercentage)
	{
		this.turnBudget = turnBudget;
		this.maxBudget = maxBudget;
		this.baseInterestRatePercentage = baseInterestRatePercentage;

		budget = initBudget;
	}

	/**
	 * gain budget according to design doc.
	 * @param turn
	 */
	public void income(int turn)
	{
		calculateInterestRatePercentage(turn);
		budget += turnBudget + interest(turn);

		//limit max budget
		if (budget > maxBudget) budget = maxBudget;
	}

	private double interest(int turn)
	{
		return budget * interestRatePercentage / 100;
	}

	private void calculateInterestRatePercentage(int turn)
	{
		interestRatePercentage = baseInterestRatePercentage * Math.log10(budget) * Math.log(turn);
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
