package org.example.kombatfetchingback.kombat_backend.Games;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.NUMBER)
public enum GameStateEnum
{
	empty, start, buyHex, buyMinion, execute, end
}
