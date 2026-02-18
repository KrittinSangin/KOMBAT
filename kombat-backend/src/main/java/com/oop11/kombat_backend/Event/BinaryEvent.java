package com.oop11.kombat_backend.Event;

import java.util.ArrayList;
import java.util.function.BiConsumer;

public class BinaryEvent<T,U> extends AbstractEvent<BiConsumer<T,U>>
{
	public BinaryEvent()
	{
		listeners = new ArrayList<>();
	}

	@Override
	@SuppressWarnings("unchecked")
	public void invoke(Object... arg)
	{
		for (var f : listeners)
			f.accept((T)arg[0],(U)arg[1]);
	}
}
