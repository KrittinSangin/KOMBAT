package Game;

import java.util.HashMap;
import java.util.Map;

public class HexMap
{
	private final Map<HexPos, Hex> hexMap;
	private final int width;
	private final int height;

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

	public int getWidth()
	{
		return width;
	}

	public int getHeight()
	{
		return height;
	}

	public Hex get(HexPos pos)
	{
		return hexMap.get(pos);
	}

	public boolean put(HexPos pos, Minion m)
	{
		return hexMap.get(pos).put(m);
	}

	public boolean remove(HexPos pos)
	{
		return hexMap.get(pos).remove();
	}

	public boolean isOccupy(HexPos pos)
	{
		return hexMap.get(pos).haveMinion();
	}

}
