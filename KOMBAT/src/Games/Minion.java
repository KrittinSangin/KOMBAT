package Games;

public class Minion
{
	private final String name;
	private Hex hex;
	private Player owner;

	private final Strategy strat;

	private int hp;
	private final int def;

	//Event<void> onDead;

	public Minion(String name, int hp, int def, Strategy strat)
	{
		this.name = name;
		this.hp = hp;
		this.def = def;
		this.strat = strat;
	}

	public Hex getHex()
	{
		return hex;
	}

	public void setHex(Hex value)
	{
		this.hex = value;
	}

	public String getName() {return name;}

	public boolean Move(HexDir dir)
	{
		HexMap map = hex.Map;
		HexPos dest = hex.Pos.nextInDir(dir);

		if (map.put(dest, this))
		{
			map.remove(hex.Pos);
			hex = map.get(dest);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean Attack(HexDir dir, int dam)
	{
		HexMap map = hex.Map;
		HexPos dest = hex.Pos.nextInDir(dir);

		if (map.isOccupy(dest))
		{
			Hex hex = map.get(dest);
			hex.getMinion().takeDamage(dam);
			return true;
		} else
		{
			return false;
		}
	}

	public void takeDamage(int dam)
	{
		hp = Math.max(hp - Math.max(1,dam - def), 0);
		if (hp < 1)
			die();
	}

	private void die()
	{
		//OnDead?.Invoke();
	}

	public Minion prototypeClone()
	{
		return new Minion(name, hp, def, strat);
	}
}
