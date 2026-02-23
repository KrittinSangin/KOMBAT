package com.oop11.kombat_backend.Games.Logs;

import com.oop11.kombat_backend.Games.DTO.ExecutionInstanceLogDTO;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;
import lombok.Builder;

import java.util.List;

@Builder
public record ExecutionInstanceLog(
	Minion minion,
	List<ExecutionInstanceLogEntry> entries,
	HaltReason reason
)
{
	void append(ExecutionInstanceLogEntry entry)
	{
		entries.add(entry);
	}

	@Override
	public String toString()
	{
		StringBuilder sb = new StringBuilder();
		sb.append("Minion:")
			.append(minion.toString())
			.append("Entries:\n[\n");

		for (var entry : entries)
		{
			sb.append("\"\t")
				.append(entry.toString())
				.append("\",\n");
		}

		sb.append("]\n")
			.append("HaltReason:")
			.append(reason);

		return sb.toString();
	}
}
