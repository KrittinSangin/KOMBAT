package Game;

public enum HexDir
{
	up(1),
	upRight(2),
	downRight(3),
	down(4),
	downLeft(5),
	upLeft(6),
	;

	public final int dirCode;

	HexDir(int dirCode)
	{
		this.dirCode = dirCode;
	}
}
