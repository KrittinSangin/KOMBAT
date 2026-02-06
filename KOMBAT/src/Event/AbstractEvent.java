package Event;

import java.util.List;

public abstract class AbstractEvent<Func> implements Event<Func>
{
	protected List<Func> listeners;

	@Override
	public void addListener(Func f)
	{
		listeners.add(f);
	}

	@Override
	public boolean haveListener()
	{
		return !listeners.isEmpty();
	}

	@Override
	public void removeAllListener()
	{
		listeners.clear();
	}
}
