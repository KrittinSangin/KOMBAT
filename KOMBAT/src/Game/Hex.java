package Game;

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

	public boolean put(Minion m)
	{
		if (haveMinion()) return false;

		minion = m;
		return true;
	}

	public boolean remove()
	{
		if (!haveMinion()) return false;

		minion = null;
		return true;
	}
}
