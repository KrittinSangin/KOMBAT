package org.example.kombatfetchingback.kombat_backend.Games.Minion;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class MinionStorage
{
	@Getter
	private final List<Minion> storage = new ArrayList<>();

	/**
	 * Add minion to storage.
	 *
	 * @param m minion to add, non null.
	 * @return true if add success
	 */
	public boolean add(Minion m)
	{
		if (m == null) return false;

		storage.add(m);
		m.OnDead.subscribe(this::OnMinionDead);
		return true;
	}

	/**
	 * get minions from the list that pass the give predicate
	 *
	 * @param pred predicate to test
	 * @return a list of minion that pass predicate
	 */
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
