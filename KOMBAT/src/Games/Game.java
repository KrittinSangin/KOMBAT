package Games;

import java.util.ArrayList;
import java.util.List;

public class Game
{
	public interface State
	{
		public static final String EMPTY_STATE = "EmptyState";
		public static final String START_STATE = "StartState";
		public static final String BUY_STATE_HEX = "BuyState(Hex)";
		public static final String BUY_STATE_MINION = "BuyState(Minion)";
		public static final String EXECUTION_STATE = "ExecuteState";
		public static final String END_STATE = "EndState";

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

		public AbstractState() {}

		@Override
		public void resolve(PlayerIntent intent)
		{
			IO.println("intent %s not resolve".formatted(intent));
		}

		;
	}

	private class EmptyState extends AbstractState
	{

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
			return EMPTY_STATE;
		}
	}

	private class StartState extends AbstractState
	{
		public StartState(State prev)
		{
			super(prev);
		}

		public StartState() {}

		;

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent() == PlayerIntent.Intent.buyMinion)
			{
				Hex hex = map.get(intent.hex());
				Minion minion = currentPlayer().getDeckMinion(intent.minion());

				if (hex == null || minion == null) return;

				if (currentPlayer().spawnMinion(hex, minion, true))
				{
					nextTurn();
					return;
				}
			}

			super.resolve(intent);
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
		}

		@Override
		public String toString()
		{
			return START_STATE;
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
			currentPlayer().onTurnStart(round);
		}

		public BuyState() {currentPlayer().onTurnStart(round);}

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
				if (intent.intent().equals(PlayerIntent.Intent.skip))
				{
					hexBought = true;
					return;
				}

				if (intent.intent().equals(PlayerIntent.Intent.buyHex))
				{
					if (currentPlayer().buyHex(map.get(intent.hex())))
						hexBought = true;
					return;
				}
			} else if (!minionBought)
			{
				if (intent.intent().equals(PlayerIntent.Intent.skip))
				{
					minionBought = true;
					return;
				}

				if (intent.intent().equals(PlayerIntent.Intent.buyMinion))
				{
					if (currentPlayer().spawnMinion(
						map.get(intent.hex()),
						currentPlayer().getDeckMinion(intent.minion()))
					)
						minionBought = true;
					return;
				}
			}
			super.resolve(intent);
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
			return resign ? new EndState(this) : new ExecuteState(this);
		}

		@Override
		public String toString()
		{
			return hexBought ? BUY_STATE_MINION : BUY_STATE_HEX;
		}
	}

	// Unfinish
	private class ExecuteState extends AbstractState
	{
		public ExecuteState(State state)
		{
			super(state);
			executor.queueExecution(storage.getIf((m) -> m.getOwner().equals(currentPlayer())));
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			//any intent, must be change later
			executor.executeAll();
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
			return endStateCondition() ? new EndState(this) : new BuyState(this);
		}

		@Override
		public String toString()
		{
			return EXECUTION_STATE;
		}
	}

	private class EndState extends AbstractState
	{
		public EndState(State state)
		{
			super(state);
			IO.println("Game End");
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			super.resolve(intent);
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
			return END_STATE;
		}
	}

	private final StrategyExecutor executor;
	private final Merchant merchant;
	private final MinionStorage storage;
	private final List<Player> players;
	private final HexMap map;

	private State gameState = new EmptyState();
	private boolean isGameStart = false;

	private int turn;
	private int round;

	/**
	 * Create an instance of a game with StartInfo
	 *
	 * @param info info and all of its field aren't null
	 */
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
			p1.buyHex(map.get(pos), true);

		players.add(p1);

		Player p2 = new Player(info.info2(), new Budget(), info.deck2());
		p2.initialize(storage, merchant, map);
		for (HexPos pos : Config.START_HEX_POS_P2)
			p2.buyHex(map.get(pos), true);

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

	public int getTurn()
	{
		return turn;
	}

	public int getRound()
	{
		return round;
	}

	public boolean isStart() {return isGameStart;}

	/**
	 * Start the game
	 */
	public void start()
	{
		gameState = new StartState();
		isGameStart = true;
	}

	/**
	 * Update the game with PlayerIntent
	 */
	public void update(PlayerIntent intent)
	{
		if (validateIntent(intent)) return;

		gameState.resolve(intent);

		if (gameState.checkSwitchState())
			gameState = gameState.nextState();
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
		return currentPlayer().getMinionCount() == 0 && round > Config.MAX_TURNS;
	}

	private Player currentPlayer()
	{
		return players.get(turn);
	}

	public boolean isOver()
	{
		return gameState.toString().equals("EndState");
	}

	private boolean validateIntent(PlayerIntent intent)
	{
		return intent.minion() < currentPlayer().getDeck().size() - 1 && map.get(intent.hex()) != null;
	}

}
