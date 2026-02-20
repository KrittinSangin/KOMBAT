package com.oop11.kombat_backend.Games;

import lombok.Getter;

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

		GameState getState();
		void resolve(PlayerIntent intent);
		void exit();
		boolean checkSwitchState();
		State nextState();
	}

	private abstract class AbstractState implements State
	{
		@Getter
		private final GameState state;
		public AbstractState(State prev, GameState state)
		{
			this.state = state;
			prev.exit();
		}

		public AbstractState(GameState state)
		{
			this.state = state;
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			IO.println("intent %s not resolve".formatted(intent));
		}
	}

	private class EmptyState extends AbstractState
	{
		public EmptyState()
		{
			super(GameState.empty);
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
			return EMPTY_STATE;
		}
	}

	private class StartState extends AbstractState
	{
		public StartState(State prev)
		{
			super(prev, GameState.start);
		}

		public StartState() {super(GameState.start);}

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
			return new BuyHexState(this);
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

	private class BuyHexState extends AbstractState
	{
		private boolean bought = false;

		public BuyHexState(State prev)
		{
			super(prev, GameState.buyHex);
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent().equals(PlayerIntent.Intent.skip))
			{
				bought = true;
				return;
			}

			if (intent.intent().equals(PlayerIntent.Intent.buyHex))
			{
				if (currentPlayer().buyHex(map.get(intent.hex())))
					bought = true;
				return;
			}
			super.resolve(intent);
		}

		@Override
		public boolean checkSwitchState()
		{
			return bought;
		}

		@Override
		public void exit() {}

		@Override
		public State nextState()
		{
			return new BuyMinionState(this);
		}

		@Override
		public String toString()
		{
			return BUY_STATE_HEX;
		}
	}

	private class BuyMinionState extends AbstractState
	{
		private boolean bought = false;

		public BuyMinionState(State prev)
		{
			super(prev, GameState.buyMinion);
			currentPlayer().onTurnStart(round);
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent().equals(PlayerIntent.Intent.skip))
			{
				bought = true;
				return;
			}

			if (intent.intent().equals(PlayerIntent.Intent.buyMinion))
			{
				if (currentPlayer().spawnMinion(
					map.get(intent.hex()),
					currentPlayer().getDeckMinion(intent.minion()))
				)
					bought = true;
				return;
			}

			super.resolve(intent);
		}

		@Override
		public void exit() {}

		@Override
		public boolean checkSwitchState()
		{
			return bought;
		}

		@Override
		public State nextState()
		{
			return new ExecuteState(this);
		}

		@Override
		public String toString()
		{
			return BUY_STATE_MINION;
		}
	}

	private class ExecuteState extends AbstractState
	{
		public ExecuteState(State prev)
		{
			super(prev, GameState.execute);
			executor.queueExecution(storage.getIf((m)->m.getOwner().equals(currentPlayer())));
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent().equals(PlayerIntent.Intent.skip) || intent.intent().equals(PlayerIntent.Intent.empty))
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
			return endStateCondition() ? new EndState(this) : new BuyHexState(this);
		}

		@Override
		public String toString()
		{
			return EXECUTION_STATE;
		}
	}

	private class EndState extends AbstractState
	{
		public EndState(State prev)
		{
			super(prev, GameState.end);
			IO.println("Game End");
			isGameOver = true;
			winner = calculateWinner();
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

	@Getter
	private final StrategyExecutor executor;
	@Getter
	private final Merchant merchant;
	@Getter
	private final MinionStorage storage;
	@Getter
	private final List<Player> players;
	@Getter
	private final HexMap map;

	@Getter
	private State gameState = new EmptyState();
	@Getter
	private boolean isGameStart = false;
	@Getter
	private boolean isGameOver = false;
	@Getter
	private boolean isGameResign = false;
	@Getter
	private boolean isGameDraw = false;
	@Getter
	private Player winner = null;

	@Getter
	private int turn;
	@Getter
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

	public List<Minion> getMinions()
	{
		return storage.getIf((x)->true);
	}

	public String getStateString()
	{
		return gameState.toString();
	}

	public boolean isStarted() {return isGameStart;}

	public boolean isResigned() {return isGameResign;}

	public boolean isDraw() {return isGameDraw;}

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
		//intent validation
		if (!validateIntent(intent)) return;

		if (intent.intent().equals(PlayerIntent.Intent.resign))
		{
			isGameResign = true;
			gameState = new EndState(gameState);
		}

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
		//any player minion count reach 0 or round exceeds max turns
		return currentPlayer().getMinionCount() == 0 || otherPlayer().getMinionCount() == 0 || round > Config.MAX_TURNS;
	}

	private Player calculateWinner()
	{
		if (isGameResign) return otherPlayer();

		Player p1 = players.get(0);
		Player p2 = players.get(1);

		//win by minion count
		if (p1.getMinionCount() == p2.getMinionCount())
		{
			//win by sum of hp
			int sumhpP1 = p1.getSpawns().stream().map(Minion::getHp).reduce(Integer::sum).get();
			int sumhpP2 = p2.getSpawns().stream().map(Minion::getHp).reduce(Integer::sum).get();
			if (sumhpP1 == sumhpP2)
			{
				//win by budget
				if (p1.getBudget().getBudget() == p2.getBudget().getBudget())
				{
					//draw
					isGameDraw = true;
					return null;
				} else
				{
					return p1.getBudget().getBudget() > p2.getBudget().getBudget() ? p1 : p2;
				}
			} else
			{
				return sumhpP1 > sumhpP2 ? p1 : p2;
			}
		} else
		{
			return p1.getMinionCount() > p2.getMinionCount() ? p1 : p2;
		}
	}

	private Player currentPlayer()
	{
		return players.get(turn);
	}

	private Player otherPlayer()
	{
		int other = turn == 0 ? 1 : 0;
		return players.get(other);
	}

	public boolean isOver()
	{
		return gameState.toString().equals(State.END_STATE);
	}

	private boolean validateIntent(PlayerIntent intent)
	{
		if (intent == null) return false;

		//buy hex, validate only hex
		if (intent.intent() == PlayerIntent.Intent.buyHex)
			if (intent.hex() != null) if (map.get(intent.hex()) == null) return false;

		//buy minion, validate hex and minion
		if (intent.intent() == PlayerIntent.Intent.buyMinion)
		{
			if (intent.hex() != null) if (map.get(intent.hex()) == null) return false;
			if (intent.minion() != null) if (intent.minion() >= currentPlayer().getDeck().size()) return false;
		}

		//otherwise, ignore value.
		return true;
	}

}
