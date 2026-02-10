package Games;

public class Hex
{
	public final HexMap Map;
	public final HexPos Pos;

	private Player owner;
	private Minion minion;

	public Hex(HexMap map, HexPos pos)
	{
		this.Map = map;
		this.Pos = pos;
	}

	public Minion getMinion()
	{
		return minion;
	}

	public Player getOwner()
	{
		return owner;
	}

	/**
	 * Is player p the owner
	 */
	public boolean isOwner(Player p)
	{
		return p.equals(owner);
	}

	public void setOwner(Player value)
	{
		owner = value;
	}

	public boolean haveOwner()
	{
		return owner != null;
	}

	public boolean haveMinion()
	{
		return minion != null;
	}

	/**
	 * try let minion m occupy this hex
	 *
	 * @return true if success
	 */
	public boolean put(Minion m)
	{
		if (haveMinion()) return false;

		minion = m;
		return true;
	}

	/**
	 * try remove minion from this hex
	 *
	 * @return true if success
	 */
	public boolean remove()
	{
		if (!haveMinion()) return false;

		minion = null;
		return true;
	}

	public boolean isAdjacentToTerritory()
	{
		return isAdjacentToTerritory(owner);
	}

	public boolean isAdjacentToTerritory(Player player)
	{
		for (int i = 1; i <= 6; i++)
		{
			HexPos pos = HexPos.nextInDir(Pos,HexDir.toHexDir(i));
			Hex check = Map.get(pos);

			if (check == null) continue;

			if (player.equals(check.getOwner())) return true;
		}
		return false;
	}

}
