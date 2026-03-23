package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

public interface Stment extends Node
{
	void execute(ExecutionInstance instance);
}
