package org.example.kombatfetchingback.kombat_backend.Parser;

import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.SyntaxError;

public interface Parser<T>
{
	/**
	 * Attempts to parse the token stream
	 * given to this parser.
	 * throws: SyntaxError if the token
	 * stream cannot be parsed
	 */
	T parse() throws SyntaxError;
}
