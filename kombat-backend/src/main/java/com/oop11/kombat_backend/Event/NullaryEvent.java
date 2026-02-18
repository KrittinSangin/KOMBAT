package com.oop11.kombat_backend.Event;

import java.util.ArrayList;

public class NullaryEvent extends AbstractEvent<Runnable>
{
	public NullaryEvent()
	{
		listeners = new ArrayList<>();
	}

	@Override
	public void invoke(Object... unuse)
	{
		for (var f : listeners)
			f.run();
	}
}
