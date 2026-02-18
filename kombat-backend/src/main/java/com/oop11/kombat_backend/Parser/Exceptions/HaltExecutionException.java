package com.oop11.kombat_backend.Parser.Exceptions;

public class HaltExecutionException extends RuntimeException
{
	public HaltExecutionException(String message)
	{
		super(message);
	}
}
