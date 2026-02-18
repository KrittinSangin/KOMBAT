package Games;

public class Merchant
{
	/**
	 * check if a player can buy this hex. If player can buy this hex, player's budget get deduct by hex price.
	 *
	 * @param p   player to buy hex
	 * @param hex hex the player want to buy
	 * @return same hex if player can buy, null if cannot
	 */
	public Hex buyHex(Player p, Hex hex)
	{
		if (p.getBudget().pay((int) Config.HEX_PURCHASE_COST)) return hex;
		return null;
	}

	/**
	 * check if player can buy this minion. If player can buy this minion, player's budget get deduct by minion price.
	 *
	 * @param p player to buy minion
	 * @param m minion player want to buy
	 * @return same minion if player can buy, null if cannot
	 */
	public Minion buyMinion(Player p, Minion m)
	{
		if (p.getBudget().pay((int) Config.SPAWN_COST)) return m;
		return null;
	}
}
