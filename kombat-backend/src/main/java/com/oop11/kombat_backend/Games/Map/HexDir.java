package com.oop11.kombat_backend.Games.Map;

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

	public static HexDir toHexDir(int i)
	{
		switch (i)
		{
			case 1 ->
			{
				return up;
			}
			case 2 ->
			{
				return upRight;
			}
			case 3 ->
			{
				return downRight;
			}
			case 4 ->
			{
				return down;
			}
			case 5 ->
			{
				return downLeft;
			}
			case 6 ->
			{
				return upLeft;
			}
			default ->
			{
				throw new IllegalArgumentException();
			}
		}
	}
}
