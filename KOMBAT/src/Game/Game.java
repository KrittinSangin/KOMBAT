package Game;

import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Game
{
	private enum GameState
	{
		start,
		buyHex,
		buyMinion,
		execute,
		gameOver,
	}

	private final StrategyExecutor executor;
	private final Merchant merchant;
	private final MinionStorage storage;
	private final List<Player> players;
	private final HexMap map;

	private GameState state;

	private int playerTurn;
	private int fullTurn;

	public Game(StartInfo info)
	{
		executor = new StrategyExecutor();
		merchant = new Merchant();
		storage = new MinionStorage();
		map = new HexMap(Config.MAP_WIDTH, Config.MAP_HEIGHT);

		//initialize local vars
		playerTurn = 0;
		fullTurn = 0;

		//initialize player
		players = new ArrayList<>();

		Player p1 = new Player(info.info1(), new Budget(), info.deck1());
		p1.initialize(storage, merchant, map);
		players.add(p1);

		Player p2 = new Player(info.info2(), new Budget(), info.deck2());
		p2.initialize(storage, merchant, map);
		players.add(p2);
	}

	public void start()
	{
		state = GameState.start;
	}

	public void update(PlayerIntent intent)
	{
		resolveIntent(intent);
		checkSwitchState();
	}

	private void checkSwitchState()
	{
		switch (state)
		{
			case start ->
			{

			}
		}
	}

	private void resolveIntent(PlayerIntent intent)
	{
		switch (state)
		{
			case start ->
			{
				if (intent.intent() == PlayerIntent.Intent.buyMinion)
				{
					if (players.get(playerTurn).spawnMinion(intent.hex(), intent.minion()))
						nextTurn();
				}
			}
		}
	}

	private void nextTurn()
	{
		if (++playerTurn > players.size())
		{
			playerTurn = 0;
			fullTurn++;
		}
	}


}
