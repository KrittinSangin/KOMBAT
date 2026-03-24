package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

public interface Expr extends Node
{
	int eval(ExecutionInstance instance);
}
