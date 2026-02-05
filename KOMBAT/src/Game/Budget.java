package Game;

public class Budget
{
	private double budget;

	public Budget()
	{
		budget = Config.INIT_BUDGET;
	}

	public void income(int turn)
	{
		budget += Config.TURN_BUDGET + interest(turn);
	}

	private double interest(int turn)
	{
		return budget * Config.INTEREST_PCT * Math.log10(budget) * Math.log(turn) / 100;
	}

	public boolean pay(int price)
	{
		if (budget - price > 0)
		{
			budget -= price;
			return true;
		}
		return false;
	}
}
