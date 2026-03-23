package org.example.kombatfetchingback.kombat_backend.Games.Logs;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexDir;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.HaltReason;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

public class ExecutionInstanceLogger
{
	private final Minion minion;
	private List<ExecutionInstanceLogEntry> entries;
	@Setter
	private HaltReason haltReason;

	public ExecutionInstanceLogger(Minion m)
	{
		minion = m;
	}

	public void appendLog(
		ExecutionInstanceLogFunctionTypeOf typeof,
		ExecutionInstanceLogFunction function,
		HexDir dir)
	{
		if (entries == null) entries = new LinkedList<>();
		entries.add(new ExecutionInstanceLogEntry(typeof,function,dir));
	}

	public ExecutionInstanceLog getLogAndClean()
	{
		ExecutionInstanceLog log = new ExecutionInstanceLog(minion,entries,haltReason);
		entries = null;
		haltReason = null;

		return log;
	}
}
