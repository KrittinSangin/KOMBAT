package Games;

public class Budget
{
	private double budget;
	private double interestRatePercentage;


	public Budget()
	{
		budget = Config.INIT_BUDGET;
	}

	public Budget(int initBudge)
	{
		budget = initBudge;
	}

	/**
	 * gain budget according to design doc.
	 * @param turn
	 */
	public void income(int turn)
	{
		calculateInterestRatePercentage(turn);
		budget += Config.TURN_BUDGET + interest(turn);

		//limit max budget
		if (budget > Config.MAX_BUDGET) budget = Config.MAX_BUDGET;
	}

	public double getBudget() {return budget;}
	public double getInterestRatePercentage() {return interestRatePercentage;}

	private double interest(int turn)
	{
		return budget * interestRatePercentage / 100;
	}

	private void calculateInterestRatePercentage(int turn)
	{
		interestRatePercentage = Config.INTEREST_PCT * Math.log10(budget) * Math.log(turn);
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
