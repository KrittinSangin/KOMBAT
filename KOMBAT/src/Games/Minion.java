package Games;

import Event.UnaryEvent;

public class Minion
{
	private final String name;
	private Hex hex;
	private Player owner;

	private final Strategy strat;

	private int hp;
	private final int def;

	public UnaryEvent<Minion> OnDead = new UnaryEvent<Minion>();

	public Minion(String name, int hp, int def, Strategy strat)
	{
		this.name = name;
		this.hp = hp;
		this.def = def;
		this.strat = strat;
	}

	//Copy Constructure
	public Minion(Minion other)
	{
		name = other.name;
		hp = other.hp;
		def = other.def;
		strat = other.strat;

		hex = other.hex;
		owner = other.owner;
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

	public Player getOwner() {return owner;}

	public int getHp() {return hp;}
	public int getDef() {return def;}

	public void setOwner(Player value) {owner = value;}

	/**
	 * move minion to new hex in direction. Minion cannot move to hex occupied hex and out of the map.
	 *
	 * @param dir direction minion want to move
	 * @return true if minion moves.
	 */
	public boolean move(HexDir dir)
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

	/**
	 * try attack minion in dir direction with dam damage.
	 *
	 * @param dir direction to attack
	 * @param dam damage to attack
	 * @return true if there is another minion get attack.
	 */
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

	/**
	 * take damage from the attack. If damage reduce hp to < 1, minion dies.
	 *
	 * @param dam damage receive
	 */
	public void takeDamage(int dam)
	{
		hp = Math.max(hp - Math.max(1, dam - def), 0);
		if (hp < 1)
			die();
	}

	private void die()
	{
		OnDead.invoke(this);

		hex.Map.remove(hex.Pos);
	}

	/**
	 * Create a new minion with the same field value of this one.
	 */
	public Minion prototypeClone()
	{
		return new Minion(this);
	}
}
