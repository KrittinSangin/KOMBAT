package kombat_backend;


import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.Game;
import org.example.kombatfetchingback.kombat_backend.Games.Map.Hex;
import org.example.kombatfetchingback.kombat_backend.Games.Map.HexMap;
import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.Player;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import org.example.kombatfetchingback.kombat_backend.Games.StartInfo;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.Strategy;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.StrategyExecutor;

import java.util.ArrayList;
import java.util.List;

public class TestingUtility
{
	public static Game instantiateGameDefault()
	{
		Config cfg = Config.defaultConfig();

		PlayerInfo p1info = new PlayerInfo("A", 0);
		PlayerInfo p2info = new PlayerInfo("B", 1);

		List<Minion> universalDeck = new ArrayList<>();
		universalDeck.add(new Minion("0", (int) cfg.initHp(), 10, new Strategy()));
		universalDeck.add(new Minion("1", (int) cfg.initHp(), 10, new Strategy()));
		universalDeck.add(new Minion("2", (int) cfg.initHp(), 10, new Strategy()));
		universalDeck.add(new Minion("3", (int) cfg.initHp(), 10, new Strategy()));
		universalDeck.add(new Minion("4", (int) cfg.initHp(), 10, new Strategy()));
		StartInfo info = new StartInfo(
			cfg,
			p1info,
			p2info,
			new ArrayList<>(universalDeck),
			new ArrayList<>(universalDeck)
		);

		Game instance = new Game(info);

		return instance;
	}

	public static Game instantiateGameEmpty()
	{
		Config cfg = Config.defaultConfig();

		PlayerInfo p1 = new PlayerInfo("A", 0);
		PlayerInfo p2 = new PlayerInfo("B", 1);

		List<Minion> deck = new ArrayList<>();

		StartInfo sInfo = new StartInfo(cfg,p1,p2,deck,deck);

		return new Game(sInfo);
	}

	public static List<Player> extractPlayers(Game game)
	{
		return game.getPlayers();
	}

	public static Player extractPlayersOfTeam(Game game, int team)
	{
		return game.getPlayers().get(team);
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
		return TestingUtility.forcePlaceControllableMinion(game,1,1);
	}
	public static Minion forcePlaceControllableMinion(Game game, int row, int col)
	{
		return forcePlaceControllableMinion(game,row,col,0);
	}

	public static Minion forcePlaceControllableMinion(Game game, int row, int col, int team)
	{
		HexMap map = TestingUtility.extractHexMap(game);
		Player player = TestingUtility.extractPlayers(game).get(team);
		HexPos pos = new HexPos(row,col);
		Minion minion = player.getDeckMinionAtIndex(0).prototypeClone();

		map.remove(pos);
		map.put(pos,minion);
		minion.setHex(map.get(pos));

		minion.setOwner(player);

		return minion;
	}

	public static void forcePlaceMinion(Game game, int row, int col, int team)
	{
		forcePlaceControllableMinion(game,row,col,team);
	}

	public static void forceRemoveMinion(Game game, int row, int col)
	{
		HexMap map = TestingUtility.extractHexMap(game);
		HexPos pos = new HexPos(row,col);
		map.remove(pos);
	}

	public static void injectMinion(Game game, Minion m, int row, int col)
	{
		HexMap map = TestingUtility.extractHexMap(game);
		HexPos pos = new HexPos(row,col);

		Minion inject = m.prototypeClone();
		inject.setHex(map.get(pos));

		map.put(pos,inject);
	}

	public static void forceExecuteAll(Game game)
	{
		StrategyExecutor exe = game.getExecutor();
		List<Minion> ls = game.getMap().getMap().values().stream().filter(Hex::haveMinion).map(Hex::getMinion).toList();
		exe.queueExecution(ls);
		exe.executeAll();
	}

	public static void forceExecuteOne(Game game,Minion target)
	{
		StrategyExecutor exe = game.getExecutor();
		List<Minion> ls = game.getMap().getMap().values().stream().filter(Hex::haveMinion).map(Hex::getMinion).filter((m)->m.equals(target)).toList();
		exe.queueExecution(ls);
		exe.executeAll();
	}

}
