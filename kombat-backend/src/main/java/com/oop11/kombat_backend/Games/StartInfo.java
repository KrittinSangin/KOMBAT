package com.oop11.kombat_backend.Games;

import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.PlayerInfo;

import java.util.List;

public record StartInfo(
	PlayerInfo info1,
	PlayerInfo info2,
	List<Minion> deck1,
	List<Minion> deck2)
{
}
