package org.example.kombatfetchingback.kombat_backend.Games;

import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.Map.Hex;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.Player;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Merchant
{
	private final int hexPurchaseCost;
	private final int spawnCost;
	/**
	 * check if a player can buy this hex. If player can buy this hex, player's budget get deduct by hex price.
	 *
	 * @param p   player to buy hex
	 * @param hex hex the player want to buy
	 * @return same hex if player can buy, null if cannot
	 */
	public Hex buyHex(Player p, Hex hex)
	{
		if (p.getBudget().pay(hexPurchaseCost)) return hex;
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
		if (p.getBudget().pay(spawnCost)) return m;
		return null;
	}
}
