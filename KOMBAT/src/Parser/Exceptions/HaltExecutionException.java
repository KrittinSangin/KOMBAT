package Parser.Exceptions;

public class HaltExecutionException extends RuntimeException
{
	public HaltExecutionException(String message)
	{
		super(message);
	}
}
