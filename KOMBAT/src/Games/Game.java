package Games;

import java.util.ArrayList;
import java.util.List;

public class Game
{
	private interface State
	{
		void resolve(PlayerIntent intent);
		void exit();
		boolean checkSwitchState();
		State nextState();
	}

	private abstract class AbstractState implements State
	{
		public AbstractState(State prev)
		{
			prev.exit();
		}

		public AbstractState(){};
	}

	private class StartState extends AbstractState
	{
		public StartState(State prev)
		{
			super(prev);
		}

		public StartState(){};

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent() == PlayerIntent.Intent.buyMinion)
			{
				currentPlayer().spawnMinion(
					map.get(intent.hex()),
					currentPlayer().getDeckMinion(intent.minion()),
					true);
				nextTurn();
			}
		}

		@Override
		public boolean checkSwitchState()
		{
			return round > 0;
		}

		@Override
		public State nextState()
		{
			return new BuyState(this);
		}

		@Override
		public void exit()
		{
			turn = 0;
		}

		@Override
		public String toString()
		{
			return "StartState";
		}
	}

	private class BuyState extends AbstractState
	{
		private boolean hexBought = false;
		private boolean minionBought = false;
		private boolean resign = false;

		public BuyState(State state)
		{
			super(state);
		}

		public BuyState(){};

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent().equals(PlayerIntent.Intent.resign))
			{
				resign = true;
				return;
			}

			if (!hexBought)
			{
				if (intent.intent().equals(PlayerIntent.Intent.buyHex))
					currentPlayer().buyHex(map.get(intent.hex()));
				hexBought = true;
				return;
			}

			if (!minionBought)
			{
				if (intent.intent().equals(PlayerIntent.Intent.buyMinion))
					currentPlayer().spawnMinion(
						map.get(intent.hex()),
						currentPlayer().getDeckMinion(intent.minion())
					);
				minionBought = true;
				return;
			}
		}

		@Override
		public void exit() {}

		@Override
		public boolean checkSwitchState()
		{
			return (hexBought && minionBought) || resign;
		}

		@Override
		public State nextState()
		{
			return resign? new EndState(this) : new ExecuteState(this);
		}

		@Override
		public String toString()
		{
			return "BuyState(" + (hexBought? "Hex" : "Minion") + ")";
		}
	}

	// Unfinish
	private class ExecuteState extends AbstractState
	{
		public ExecuteState(State state)
		{
			super(state);
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			//resolve execution
		}

		@Override
		public void exit()
		{
			nextTurn();
		}

		@Override
		public boolean checkSwitchState()
		{
			return true;
		}

		@Override
		public State nextState()
		{
			return endStateCondition()? new EndState(this) : new BuyState(this);
		}

		@Override
		public String toString()
		{
			return "ExecuteState";
		}
	}

	private class EndState extends AbstractState
	{
		public EndState(State state)
		{
			super(state);
		}

		@Override
		public void resolve(PlayerIntent intent)
		{

		}

		@Override
		public void exit()
		{

		}

		@Override
		public boolean checkSwitchState()
		{
			return false;
		}

		@Override
		public State nextState()
		{
			return null;
		}

		@Override
		public String toString()
		{
			return "EndState";
		}
	}

	private final StrategyExecutor executor;
	private final Merchant merchant;
	private final MinionStorage storage;
	private final List<Player> players;
	private final HexMap map;

	private State gameState;

	private int turn;
	private int round;

	public Game(StartInfo info)
	{
		executor = new StrategyExecutor();
		merchant = new Merchant();
		storage = new MinionStorage();
		map = new HexMap(Config.MAP_WIDTH, Config.MAP_HEIGHT);

		//initialize local vars
		turn = 0;
		round = 0;

		//initialize player
		players = new ArrayList<>();

		Player p1 = new Player(info.info1(), new Budget(), info.deck1());
		p1.initialize(storage, merchant, map);
		for (HexPos pos : Config.START_HEX_POS_P1)
			p1.buyHex(map.get(pos),true);

		players.add(p1);

		Player p2 = new Player(info.info2(), new Budget(), info.deck2());
		p2.initialize(storage, merchant, map);
		for (HexPos pos : Config.START_HEX_POS_P2)
			p1.buyHex(map.get(pos),true);

		players.add(p2);
	}

	public HexMap getMap()
	{
		return map;
	}

	public List<Player> getPlayers()
	{
		return players;
	}

	public List<Minion> getMinions()
	{
		return storage.getIf((x)->true);
	}

	public String getStateString()
	{
		return gameState.toString();
	}

	public void start()
	{
		gameState = new StartState();
	}

	public void update(PlayerIntent intent)
	{
		gameState.resolve(intent);
	}

	private void nextTurn()
	{
		if (++turn >= players.size())
		{
			turn = 0;
			round++;
		}
	}

	private boolean endStateCondition()
	{
		return currentPlayer().getMinionCount() == 0;
	}

	private Player currentPlayer()
	{
		return players.get(turn);
	}

	public boolean isOver()
	{
		return gameState.toString().equals("EndState");
	}


}
