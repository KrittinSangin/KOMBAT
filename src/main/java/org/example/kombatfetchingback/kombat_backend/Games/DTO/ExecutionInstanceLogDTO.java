package org.example.kombatfetchingback.kombat_backend.Games.DTO;

import org.example.kombatfetchingback.kombat_backend.Games.Logs.ExecutionInstanceLogEntry;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.HaltReason;
import lombok.Builder;

import java.util.List;

@Builder
public record ExecutionInstanceLogDTO
	(
		MinionDTO minion,
		List<ExecutionInstanceLogEntry> entries,
		HaltReason reason
	)
{}
