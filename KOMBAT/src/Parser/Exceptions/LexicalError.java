package Parser.Exceptions;

public class LexicalError extends RuntimeException
{
	public LexicalError(String message) {
		super(message);
	}
}
