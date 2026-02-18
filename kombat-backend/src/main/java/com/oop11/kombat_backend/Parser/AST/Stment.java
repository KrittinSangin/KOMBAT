package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;

public interface Stment extends Node
{
	void execute(ExecutionInstance instance);
}
