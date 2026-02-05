package Games;

public record HexPos(int row, int col)
{
	public HexPos nextInDir(HexDir dir)
	{
		return nextInDir(this, dir);
	}

	public static HexPos nextInDir(HexPos pos, HexDir dir)
	{
		HexPos nextPos = null;
		switch (dir)
		{
			case up ->
			{
				nextPos = new HexPos(pos.row - 1, pos.col);
			}
			case upRight ->
			{
				int newRow = pos.col % 2 == 0 ? pos.row - 1 : pos.row;
				nextPos = new HexPos(newRow, pos.col + 1);
			}
			case downRight ->
			{
				int newRow = pos.col % 2 == 1 ? pos.row + 1 : pos.row;
				nextPos = new HexPos(newRow, pos.col + 1);
			}
			case down ->
			{
				nextPos = new HexPos(pos.row + 1, pos.col);
			}
			case downLeft ->
			{
				int newRow = pos.col % 2 == 1 ? pos.row + 1 : pos.row;
				nextPos = new HexPos(newRow, pos.col - 1);
			}
			case upLeft ->
			{
				int newRow = pos.col % 2 == 0 ? pos.row - 1 : pos.row;
				nextPos = new HexPos(newRow, pos.col - 1);
			}
		}
		return nextPos;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj instanceof HexPos(int r, int c))
			return row == r && col == c;
		return false;
	}

	@Override
	public int hashCode()
	{
		return row + col * row;
	}
}
