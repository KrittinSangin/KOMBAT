package com.oop11.kombat_backend.Parser;

import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.oop11.kombat_backend.Parser.Exceptions.*;

public class StrategyTokenizer implements Tokenizer
{
	private final String raw;
	private String next;

	private static final String STRAT_REGEX = "\\d+|[\\p{Alpha}_]+|[+\\-*/%()^{}=]";
	private static final String VALIDATION_REGEX = "[\\p{Alnum}\\s+\\-*/%()^{}=_\n\t]*";

	private final Matcher matcher;

	public StrategyTokenizer(String src)
	{
		raw = src;
		matcher = Pattern.compile(STRAT_REGEX).matcher(src);
		computeNext();
	}

	public String getRawString() {return raw;}

	@Override
	public boolean hasNextToken()
	{
		return next != null;
	}

	public void checkNextToken()
	{
		if (!hasNextToken()) throw new NoSuchElementException("no more tokens");
	}

	public boolean peek(String s)
	{
		return hasNextToken() && peek().equals(s);
	}

	@Override
	public String peek()
	{
		checkNextToken();
		return next;
	}

	public String consume(String s) throws SyntaxError
	{
		if (peek(s))
			return consume();
		else
			throw new SyntaxError(s + " expected");
	}


	@Override
	public String consume()
	{
		checkNextToken();
		String result = next;
		computeNext();
		return result;
	}

	private void computeNext()
	{
		if (matcher.find())
		{
			String next = matcher.group();
			if (!next.matches(VALIDATION_REGEX)) throw new LexicalError(next + " contains unknow character(s)");
			this.next = next;
		} else
			next = null;
	}
}
