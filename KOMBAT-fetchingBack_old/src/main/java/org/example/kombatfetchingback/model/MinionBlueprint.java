package org.example.kombatfetchingback.model;

import lombok.Builder;

@Builder
public record MinionBlueprint(
	String name,
	int def,
	String strategyFileName,
	boolean isStrategyParsedOk,
	int index,
	String spriteName
)
{
}
