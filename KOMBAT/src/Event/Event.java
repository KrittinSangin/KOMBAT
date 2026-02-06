package Event;

public interface Event<Func>
{
	void addListener(Func f);
	boolean haveListener();
	void invoke(Object... arg);
	void removeAllListener();
}
