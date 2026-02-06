package Event;

public interface Event<Func>
{
	/**
	 * Add function as listener
	 */
	void subscribe(Func f);

	boolean haveListener();

	/**
	 * Invoke all subscriber function
	 */
	void invoke(Object... arg);

	void removeAllSubscriber();
}
