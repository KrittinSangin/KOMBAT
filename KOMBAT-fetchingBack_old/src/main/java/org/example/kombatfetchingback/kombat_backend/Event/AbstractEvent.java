package org.example.kombatfetchingback.kombat_backend.Event;

import java.util.List;

public abstract class AbstractEvent<Func> implements Event<Func>
{
	protected List<Func> listeners;

	@Override
	public void subscribe(Func f)
	{
		listeners.add(f);
	}

	@Override
	public boolean haveListener()
	{
		return !listeners.isEmpty();
	}

	@Override
	public void removeAllSubscriber()
	{
		listeners.clear();
	}
}
