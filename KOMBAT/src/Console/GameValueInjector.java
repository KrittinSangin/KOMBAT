package Console;

import Games.Game;
import MVC.InputManager;

import java.util.*;

public class GameValueInjector
{
	private final Game instance;
	private final InputManager<String> ipm;

	Queue<String> values = new LinkedList<>();


	public GameValueInjector(Game other, InputManager<String> ipm)
	{
		instance = other;
		this.ipm = ipm;
	}

	/**
	 * queue value to be inject
	 * @param s value to inject
	 */
	public void addValue(String s)
	{
		values.add(s);
	}

	/**
	 * inject value from queue. On first call, call Game.Start()
	 * @return instance of the game after update.
	 */
	public Game step()
	{
		if (!instance.isStarted()) instance.start();
		else
		{
			ipm.readInput(values.poll());
			instance.update(ipm.getIntent());
		}
		return instance;
	}
}
