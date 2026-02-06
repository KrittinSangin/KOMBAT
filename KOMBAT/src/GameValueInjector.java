import Games.Game;

import java.util.*;

public class GameValueInjector
{
	private final Game instance;
	private final InputManager ipm;

	Queue<String> values = new LinkedList<>();

	public GameValueInjector(Game other, InputManager ipm)
	{
		instance = other;
		this.ipm = ipm;
	}

	public void addValue(String s)
	{
		values.add(s);
	}

	public Game step()
	{
		if (!instance.isStart()) instance.start();
		else
		{
			ipm.readInput(values.poll());
			instance.update(ipm.getIntent());
		}
		return instance;
	}
}
