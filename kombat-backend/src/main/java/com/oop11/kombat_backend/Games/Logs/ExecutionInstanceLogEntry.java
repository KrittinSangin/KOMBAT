package com.oop11.kombat_backend.Games.Logs;

import com.oop11.kombat_backend.Games.HexDir;

public record ExecutionInstanceLogEntry(
	ExecutionInstanceLogFunctionTypeOf typeof,
	ExecutionInstanceLogFunction function,
	HexDir dir
)
{
	@Override
	public String toString()
	{
		return "FunctionTypeOf:%s, Function:%s, HexDir%s"
			.formatted(typeof,function,dir);
	}
}
