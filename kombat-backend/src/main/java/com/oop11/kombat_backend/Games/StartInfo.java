package com.oop11.kombat_backend.Games;

import com.oop11.kombat_backend.Tuples.Pair;

import javax.swing.*;
import java.util.List;

public record StartInfo(
	PlayerInfo info1,
	PlayerInfo info2,
	List<Minion> deck1,
	List<Minion> deck2)
{
}
