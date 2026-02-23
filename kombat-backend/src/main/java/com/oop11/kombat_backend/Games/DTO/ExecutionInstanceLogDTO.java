package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLogEntry;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;
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
