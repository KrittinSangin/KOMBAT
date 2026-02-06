package Parser;

import Parser.Exceptions.SyntaxError;

public interface Parser<T>
{
	/** Attempts to parse the token stream
	 *  given to this parser.
	 *  throws: SyntaxError if the token
	 *          stream cannot be parsed */
	T parse() throws SyntaxError;
}
