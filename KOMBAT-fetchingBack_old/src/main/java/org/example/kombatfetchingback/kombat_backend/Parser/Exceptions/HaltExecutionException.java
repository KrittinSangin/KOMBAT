package org.example.kombatfetchingback.kombat_backend.Parser.Exceptions;

public class HaltExecutionException extends RuntimeException
{
	public HaltReason reason;
	public HaltExecutionException(HaltReason reason)
	{
		super(reason.toString());
	}
}
