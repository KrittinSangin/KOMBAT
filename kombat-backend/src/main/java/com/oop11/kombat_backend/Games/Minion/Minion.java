package com.oop11.kombat_backend.Games.Minion;

import com.oop11.kombat_backend.Event.UnaryEvent;
import com.oop11.kombat_backend.Games.Map.Hex;
import com.oop11.kombat_backend.Games.Map.HexDir;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Map.HexPos;
import com.oop11.kombat_backend.Games.Player.Player;
import com.oop11.kombat_backend.Games.Strategies.Strategy;
import lombok.Getter;
import lombok.Setter;

public class Minion
{
	@Getter
	private final String name;
	@Getter @Setter
	private Hex hex;
	@Getter @Setter
	private Player owner;

	private final Strategy strat;

	@Getter
	private int hp;
	@Getter
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

	public Strategy getStrategy() {return strat;}

	/**
	 * move minion to new hex in direction. Minion cannot move to hex occupied hex and out of the map.
	 *
	 * @param dir direction minion want to move
	 * @return true if minion moves.
	 */
	public boolean move(HexDir dir)
	{
		IO.println("move in %s".formatted(dir));
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
	public boolean shoot(HexDir dir, int dam)
	{
		IO.println("shoot in %s with %d".formatted(dir,dam));

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

	@Override
	public int hashCode()
	{
		// Map --> Hex --> (Minion)
		int hash = 17;
		hash = 34 * hash + name.hashCode();
		hash = owner == null? 0 : hash + owner.getPlayerInfo().team();
		hash = 34 * hash + hp;
		hash = 34 * hash + def;
		return hash;
	}

	@Override
	public boolean equals(Object o)
	{
		if (this == o) return true;
		if (!(o instanceof Minion other)) return false;

		return name.equals(other.name)
			&& (owner == null || other.owner == null? owner == other.owner : owner.getPlayerInfo().team() == other.owner.getPlayerInfo().team())
			&& strat.equals(other.strat)
			&& hp == other.hp
			&& def == other.def;
	}

}
