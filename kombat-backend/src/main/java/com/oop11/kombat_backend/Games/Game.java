package com.oop11.kombat_backend.Games;

import com.oop11.kombat_backend.Games.Configs.Config;
import com.oop11.kombat_backend.Games.DTO.*;
import com.oop11.kombat_backend.Games.Map.Hex;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Map.HexPos;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.Budget;
import com.oop11.kombat_backend.Games.Player.Player;
import com.oop11.kombat_backend.Games.Player.PlayerIntent;
import com.oop11.kombat_backend.Games.Minion.MinionStorage;
import com.oop11.kombat_backend.Games.Player.PlayerIntentEnum;
import com.oop11.kombat_backend.Games.Strategies.StrategyExecutor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Game
{

	public interface State
	{
		String EMPTY_STATE = "EmptyState";
		String START_STATE = "StartState";
		String BUY_STATE_HEX = "BuyState(Hex)";
		String BUY_STATE_MINION = "BuyState(Minion)";
		String EXECUTION_STATE = "ExecuteState";
		String END_STATE = "EndState";

		GameStateEnum getState();
		void resolve(PlayerIntent intent);
		void exit();
		boolean checkSwitchState();
		State nextState();
	}

	private abstract class AbstractState implements State
	{
		@Getter
		private final GameStateEnum state;
		public AbstractState(State prev, GameStateEnum state)
		{
			this.state = state;
			prev.exit();
		}

		public AbstractState(GameStateEnum state)
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
			super(GameStateEnum.empty);
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
			super(prev, GameStateEnum.start);
		}

		public StartState() {super(GameStateEnum.start);}

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent() == PlayerIntentEnum.buyMinion)
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
			super(prev, GameStateEnum.buyHex);
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent().equals(PlayerIntentEnum.skip))
			{
				bought = true;
				return;
			}

			if (intent.intent().equals(PlayerIntentEnum.buyHex))
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
			super(prev, GameStateEnum.buyMinion);
			currentPlayer().onTurnStart(round);
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent().equals(PlayerIntentEnum.skip))
			{
				bought = true;
				return;
			}

			if (intent.intent().equals(PlayerIntentEnum.buyMinion))
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
			super(prev, GameStateEnum.execute);
			executor.queueExecution(storage.getIf((m)->m.getOwner().equals(currentPlayer())));
		}

		@Override
		public void resolve(PlayerIntent intent)
		{
			if (intent.intent().equals(PlayerIntentEnum.skip) || intent.intent().equals(PlayerIntentEnum.empty))
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
			super(prev, GameStateEnum.end);
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

	private final Config cfg;

	private final StrategyExecutor executor;
	private final Merchant merchant;
	private final MinionStorage storage;
	private final List<Player> players;
	private final HexMap map;

	private State gameState = new EmptyState();
	private boolean isGameStart = false;
	private boolean isGameOver = false;
	private boolean isGameResign = false;
	private boolean isGameDraw = false;
	private Player winner = null;

	private int turn;
	private int round;

	/**
	 * Create an instance of a game with StartInfo
	 *
	 * @param info info and all of its field aren't null
	 */
	public Game(StartInfo info)
	{
		cfg = info.config();

		executor = new StrategyExecutor(cfg);
		merchant = new Merchant((int) cfg.hexPurchaseCost(),(int) cfg.spawnCost());
		storage = new MinionStorage();
		map = new HexMap(cfg.mapWidth(), cfg.mapHeight());

		//initialize local vars
		turn = 0;
		round = 0;

		//initialize player
		players = new ArrayList<>();

		Player p1 = new Player(info.info1(), new Budget(cfg), info.deck1(), cfg);
		p1.initialize(storage, merchant, map);
		for (HexPos pos : cfg.startHexPosP1())
			p1.buyHex(map.get(pos), true);

		players.add(p1);

		Player p2 = new Player(info.info2(), new Budget(cfg), info.deck2(), cfg);
		p2.initialize(storage, merchant, map);
		for (HexPos pos : cfg.startHexPosP2())
			p2.buyHex(map.get(pos), true);

		players.add(p2);
	}

	public List<Minion> getMinions()
	{
		return storage.getIf((_)->true);
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
	public GameDTO update(PlayerIntent intent)
	{
		//Save some variable before computation begins
		GameStateEnum beforeComputeState = gameState.getState();

		//intent validation
		boolean validateResult = validateIntent(intent);
		if (validateResult)
		{

			//if player resign in any state.
			if (intent.intent().equals(PlayerIntentEnum.resign))
			{
				isGameResign = true;
				gameState = new EndState(gameState);
			}

			//resolve intent for current state
			gameState.resolve(intent);

			if (gameState.checkSwitchState())
				gameState = gameState.nextState();
		}

		return DTOFactory.createGameDTO(this, intent, beforeComputeState, validateResult);
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
		return currentPlayer().getMinionCount() == 0 || otherPlayer().getMinionCount() == 0 || round > cfg.maxTurns();
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
			var maybeSum1 = p1.getSpawns().stream().map(Minion::getHp).reduce(Integer::sum);
			var maybeSum2 = p2.getSpawns().stream().map(Minion::getHp).reduce(Integer::sum);

			int sumhpP1 = maybeSum1.orElse(0);
			int sumHpP2 = maybeSum2.orElse(0);
			if (sumhpP1 == sumHpP2)
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
				return sumhpP1 > sumHpP2 ? p1 : p2;
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
		if (intent.intent() == PlayerIntentEnum.buyHex)
			if (intent.hex() != null) if (map.get(intent.hex()) == null) return false;

		//buy minion, validate hex and minion
		if (intent.intent() == PlayerIntentEnum.buyMinion)
		{
			if (intent.hex() != null) if (map.get(intent.hex()) == null) return false;
			if (intent.minion() != null) if (intent.minion() >= currentPlayer().getDeck().size()) return false;
		}

		//otherwise, ignore value.
		return true;
	}
}
