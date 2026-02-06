package Games;

public class Budget
{
	private double budget;

	public Budget()
	{
		budget = Config.INIT_BUDGET;
	}

	/**
	 * gain budget according to design doc.
	 * @param turn
	 */
	public void income(int turn)
	{
		budget += Config.TURN_BUDGET + interest(turn);
	}

	public double getBudget() {return budget;}

	private double interest(int turn)
	{
		return budget * Config.INTEREST_PCT * Math.log10(budget) * Math.log(turn) / 100;
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
