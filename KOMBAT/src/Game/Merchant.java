package Game;

public class Merchant
{
	public Hex buyHex(Player p, Hex hex)
	{
		if (hex.haveOwner()) return null;
		if (p.getBudget().pay((int) Config.HEX_PURCHASE_COST)) return hex;
		return null;
	}

	public Minion buyMinion(Player p, Minion m)
	{
		if (p.getBudget().pay((int) Config.MAX_SPAWNS)) return m;
		return null;
	}
}
