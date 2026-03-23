package org.example.kombatfetchingback.kombat_backend.Games.Logs;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexDir;
import lombok.Builder;

@Builder
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
