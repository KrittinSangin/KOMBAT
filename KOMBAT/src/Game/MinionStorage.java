package Game;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class MinionStorage
{
	private final List<Minion> storage = new ArrayList<>();

	public boolean add(Minion m)
	{
		boolean result = storage.add(m);
		// if (result) m.addListener(OnMinionDead);
		return storage.add(m);
	}

	public List<Minion> getIf(Predicate<Minion> pred)
	{
		List<Minion> out = new ArrayList<>();
		for (var m : storage)
		{
			if (pred.test(m)) out.add(m);
		}

		return out;
	}

	private void OnMinionDead(Minion m)
	{
		storage.remove(m);
	}
}
