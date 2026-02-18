package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;

public interface Expr extends Node
{
	int eval(ExecutionInstance instance);
}
