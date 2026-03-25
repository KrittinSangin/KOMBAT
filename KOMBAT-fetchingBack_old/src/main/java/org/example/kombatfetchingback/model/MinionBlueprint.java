package org.example.kombatfetchingback.model;

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
