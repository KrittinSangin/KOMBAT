package com.oop11.kombat_backend.Games;

public class Config
{
	public static double SPAWN_COST;
	public static double HEX_PURCHASE_COST;
	public static double INIT_BUDGET;
	public static double INIT_HP;
	public static double TURN_BUDGET;
	public static double MAX_BUDGET;
	public static double INTEREST_PCT;
	public static double MAX_TURNS;
	public static double MAX_SPAWNS;

	//additional config
	public static int MAP_WIDTH;
	public static int MAP_HEIGHT;
	public static HexPos[] START_HEX_POS_P1;
	public static HexPos[] START_HEX_POS_P2;

	/**
	 * Set all Config field to preset default value
	 */
	public static void useDefaultConfig()
	{
		Config.SPAWN_COST = 100;
		Config.HEX_PURCHASE_COST = 100;
		Config.INIT_BUDGET = 1000;
		Config.INIT_HP = 100;
		Config.TURN_BUDGET = 100;
		Config.MAX_BUDGET = 10000;
		Config.INTEREST_PCT = 10;
		Config.MAX_TURNS = 10;
		Config.MAX_SPAWNS = 20;

		Config.MAP_WIDTH = 8;
		Config.MAP_HEIGHT = 8;

		Config.START_HEX_POS_P1 = new HexPos[]
			{
				new HexPos(1, 1),
				new HexPos(1, 2),
				new HexPos(1, 3),
				new HexPos(2, 1),
				new HexPos(2, 2),
			};

		Config.START_HEX_POS_P2 = new HexPos[]
			{
				new HexPos(7, 7),
				new HexPos(7, 8),
				new HexPos(8, 6),
				new HexPos(8, 7),
				new HexPos(8, 8),
			};
	}
}
