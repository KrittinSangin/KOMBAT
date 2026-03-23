package org.example.kombatfetchingback.kombat_backend.Games.Map;

import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class HexMap
{
	private final Map<HexPos, Hex> hexMap;
	@Getter
	private final int width;
	@Getter
	private final int height;

	/**
	 * create rectangular hexagon map of width and height
	 *
	 * @param w width
	 * @param h height
	 */
	public HexMap(int w, int h)
	{
		this.width = w;
		this.height = h;

		hexMap = PopulateMap(width, height);
	}

	private Map<HexPos, Hex> PopulateMap(int w, int h)
	{
		Map<HexPos, Hex> newMap = new HashMap<>();
		for (int r = 1; r <= h; r++)
		{
			for (int c = 1; c <= w; c++)
			{
				HexPos pos = new HexPos(r, c);
				Hex hex = new Hex(this, pos);

				newMap.put(pos, hex);
			}
		}
		return newMap;
	}

	public Map<HexPos, Hex> getMap() {return hexMap;}

	/**
	 * get Hex at pos
	 *
	 * @return hex at pos or null if pos out of range
	 */
	public Hex get(HexPos pos)
	{
		return hexMap.get(pos);
	}

	/**
	 * place minion m at pos
	 *
	 * @return true if successfully place minion m at pos
	 */
	public boolean put(HexPos pos, Minion m)
	{
		Hex hex = hexMap.get(pos);
		if (hex == null) return false;
		return hex.put(m);
	}

	/**
	 * remove minion from pos
	 *
	 * @return true if there is a minion removal
	 */
	public boolean remove(HexPos pos)
	{
		return hexMap.get(pos).remove();
	}

	/**
	 * check if this hex at pos have minion?
	 *
	 * @return true if there is minion.
	 */
	public boolean isOccupy(HexPos pos)
	{
		return hexMap.get(pos).haveMinion();
	}


	@Override
	public int hashCode()
	{
		// (Map) --> Hex --> Minion
		int acc = 0;

		for (var hex : hexMap.entrySet())
			acc += hex.getValue().hashCode();

		return acc;
	}

	@Override
	public boolean equals(Object o)
	{
		if (this == o) return true;
		if (!(o instanceof HexMap other)) return false;

		return hexMap.equals(other.hexMap);
	}
}
