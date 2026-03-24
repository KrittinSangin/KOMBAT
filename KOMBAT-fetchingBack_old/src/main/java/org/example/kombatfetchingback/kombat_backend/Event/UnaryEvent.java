package org.example.kombatfetchingback.kombat_backend.Event;

import java.util.ArrayList;
import java.util.function.Consumer;

public class UnaryEvent<T> extends AbstractEvent<Consumer<T>>
{
	public UnaryEvent() {listeners = new ArrayList<>();}


	@Override
	@SuppressWarnings("unchecked")
	public void invoke(Object... arg)
	{
		for (var f : listeners)
			f.accept((T)arg[0]);
	}
}
