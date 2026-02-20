package com.oop11.kombat_backend.Games.Map;

import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.Player;
import lombok.Getter;
import lombok.Setter;

public class Hex
{
	public final HexMap Map;
	public final HexPos Pos;

	@Getter @Setter
	private Player owner;
	@Getter
	private Minion minion;

	public Hex(HexMap map, HexPos pos)
	{
		this.Map = map;
		this.Pos = pos;
	}

	/**
	 * Is player p the owner
	 */
	public boolean isOwner(Player p)
	{
		return p.equals(owner);
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

	@Override
	public int hashCode()
	{
		// Map --> (Hex) --> Minion
		int hash = 23;
		hash = 31 * hash + Pos.hashCode();
		if (owner != null)
			hash = hash + owner.getPlayerInfo().team();
		if (minion != null)
			hash = 31 * hash + minion.hashCode();
		return hash;
	}

	@Override
	public boolean equals(Object o)
	{
		if (this == o) return true;
		if (!(o instanceof Hex other)) return false;

		return Pos.equals(other.Pos)
			&& (owner == null || other.owner == null? owner == other.owner : owner.getPlayerInfo().team() == other.owner.getPlayerInfo().team())
			&& (minion == null || other.minion == null? minion == other.minion : minion.equals(other.minion));
	}

}
