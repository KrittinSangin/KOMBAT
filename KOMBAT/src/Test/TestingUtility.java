package Test;

import Games.*;

import java.util.ArrayList;
import java.util.List;

public class TestingUtility
{
	public static Game instantiateGameDefault()
	{
		Config.useDefaultConfig();

		PlayerInfo p1info = new PlayerInfo("A", 0);
		PlayerInfo p2info = new PlayerInfo("B", 1);

		List<Minion> universalDeck = new ArrayList<>();
		universalDeck.add(new Minion("0", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("1", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("2", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("3", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("4", (int) Config.INIT_HP, 10, new Strategy(null)));
		StartInfo info = new StartInfo(
			p1info,
			p2info,
			new ArrayList<>(universalDeck),
			new ArrayList<>(universalDeck)
		);

		Game instance = new Game(info);

		return instance;
	}

	public static List<Player> extractPlayers(Game game)
	{
		return game.getPlayers();
	}

	public static HexMap extractHexMap(Game game)
	{
		return game.getMap();
	}

	public static List<Minion> extractMinions(Game game)
	{
		return game.getMinions();
	}

	public static Minion forcePlaceControllableMinion(Game game)
	{
		return TestingUtility.forcePlaceControllableMinion(game,0,0);
	}

	public static Minion forcePlaceControllableMinion(Game game, int row, int col)
	{
		return forcePlaceControllableMinion(game,row,col,0);
	}

	public static Minion forcePlaceControllableMinion(Game game, int row, int col, int playerNum)
	{
		HexMap map = TestingUtility.extractHexMap(game);
		Player player = TestingUtility.extractPlayers(game).get(playerNum);
		HexPos pos = new HexPos(row,col);
		Minion minion = player.getDeckMinion(0).prototypeClone();

		map.remove(pos);
		map.put(pos,minion);
		minion.setHex(map.get(pos));

		minion.setOwner(player);

		return minion;
	}

	public static void forcePlaceMinion(Game game, int row, int col, int playerNum)
	{
		forcePlaceControllableMinion(game,row,col,playerNum);
	}

	public static void forceRemoveMinion(Game game, int row, int col)
	{
		HexMap map = TestingUtility.extractHexMap(game);
		HexPos pos = new HexPos(row,col);
		map.remove(pos);
	}
}
