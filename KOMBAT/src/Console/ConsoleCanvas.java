package Console;

import Games.*;
import MVC.Canvas;
import Tuples.Pair;

import java.util.*;
import java.util.function.Function;


public class ConsoleCanvas implements Canvas
{
	private static final int CANVAS_WIDTH = 151;
	private static final int CANVAS_HEIGHT = 26;

	private static final int HEX_MAP_START_COL = 45;
	private static final int HEX_MAP_START_ROW = 1;

	private static final int P1_TURN_INDICATOR_ROW = 1;
	private static final int P1_TURN_INDICATOR_COL = 20;
	private static final int P2_TURN_INDICATOR_ROW = 1;
	private static final int P2_TURN_INDICATOR_COL = 125;

	private static final int P1_COL_OFFSET = 2;
	private static final int P2_COL_OFFSET = 108;

	private static final boolean DO_DRAW_NUMBER = false;

	private final Game game;
	private char[][] canvas = new char[CANVAS_HEIGHT][CANVAS_WIDTH];


	public ConsoleCanvas(Game instance)
	{
		this.game = instance;
	}

	@Override
	public void draw()
	{
		//clear to black
		fillCanvas(' ');

		drawHexMap(game.getMap(), HEX_MAP_START_ROW, HEX_MAP_START_COL);

		var players = game.getPlayers();
		drawPlayerStatus(players.get(0), 4, P1_COL_OFFSET);
		drawPlayerStatus(players.get(1), 4, P2_COL_OFFSET);

		if (game.getTurn() == 0)
		{
			drawDiamond(P1_TURN_INDICATOR_ROW, P1_TURN_INDICATOR_COL);
		} else
		{
			drawDiamond(P2_TURN_INDICATOR_ROW, P2_TURN_INDICATOR_COL);
		}

		//draw game state
		String gameStateString = "Round: %d   turn of player: %d   state:%s   ".formatted(
			game.getRound(),
			game.getTurn(),
			game.getStateString()
		);

		drawString(gameStateString, 0, 0);

		//////////////////
		//draw to screen//
		//////////////////
		StringBuilder sb = new StringBuilder();

		//draw numbers
		if (DO_DRAW_NUMBER)
		{
			sb.append(' ');
			for (int i = 1; i < CANVAS_WIDTH; i++)
				sb.append(i / 100 == 0 ? " " : i / 100);
			IO.println(sb.toString());

			sb = new StringBuilder();
			sb.append(' ');
			for (int i = 1; i < CANVAS_WIDTH; i++)
			{
				if (i / 10 >= 10) sb.append((i - 100) / 10);
				else sb.append(i / 10 == 0 ? " " : i / 10);

			}
			IO.println(sb.toString());

			sb = new StringBuilder();
			for (int i = 0; i < CANVAS_WIDTH; i++)
				sb.append(i % 10);
			IO.println(sb.toString());
		}

		//draw hexs
		for (int r = 0; r < CANVAS_HEIGHT; r++)
		{
			sb = new StringBuilder();
			for (int c = 0; c < CANVAS_WIDTH; c++)
			{
				sb.append(canvas[r][c]);
			}
			IO.println(sb.toString());
		}
	}

	private void clear()
	{
		canvas = new char[CANVAS_HEIGHT][CANVAS_WIDTH];
	}

	private void fillCanvas(char symbol)
	{
		for (int r = 0; r < CANVAS_HEIGHT; r++)
		{
			for (int c = 0; c < CANVAS_WIDTH; c++)
			{
				canvas[r][c] = symbol;
			}
		}
	}

	private void drawPlayerStatus(Player p, int sr, int sc)
	{
		drawString("Player", sr++, sc);
		drawString(p.getPlayerInfo().name(), sr++, sc);
		drawString("Budget " + Integer.toString((int) p.getBudget().getBudget()), sr++, sc);
	}


	private void drawHexMap(HexMap map, int sr, int sc)
	{
		int width = map.getWidth();
		int height = map.getHeight();

		int cellCount = width * height;

		List<Pair<Integer, Integer>> traversalPos = new ArrayList<>();
		//generate traversal index
		Pair<Integer, Integer> it = new Pair<>(1, 2);
		Function<Pair<Integer, Integer>, Pair<Integer, Integer>> next =
			(var p)->
			{
				int pr = p.fst();
				int pc = p.snd();

				boolean isEvenColum = pc % 2 == 0;

				if (isEvenColum)
				{
					if (pc / 2 == width / 2)
					{
						pc = 1;
					} else
					{
						pc += 2;
					}
				} else
				{
					if (pc / 2 == width / 2 - 1)
					{
						pc = 2;
						pr++;
					} else
					{
						pc += 2;
					}
				}


				return new Pair<>(pr, pc);
			};
		traversalPos.add(it);
		for (int i = 1; i < cellCount; i++)
		{
			it = next.apply(it);
			traversalPos.add(it);
		}

		//draw actual hex
		for (var p : traversalPos)
		{
			//initialize vars
			int r, c;
			r = p.fst();
			c = p.snd();
			Hex hex = game.getMap().get(new HexPos(r, c));
			boolean isEvenCol = c % 2 == 0;

			//parameter use to tune the hex
			r = sr + (r * 3 - 2) - 1;
			r = isEvenCol ? r : r + 1;
			c = sc + (c * 8 - 3) - 5;

			//minion and owner handle
			char owner = ' ';
			char minion = ' ';
			char minionOwner = ' ';
			if (hex.haveOwner()) owner = hex.getOwner().getPlayerInfo().name().toUpperCase().toCharArray()[0];
			if (hex.haveMinion()) minion = hex.getMinion().getName().toCharArray()[0];
			if (hex.haveMinion())
				minionOwner = hex.getMinion().getOwner().getPlayerInfo().name().toLowerCase().toCharArray()[0];

			drawHex(r, c, owner, minion, minionOwner);
		}
	}

	/*
	./=\.
	<...>
	.\=/.
	*/
	private void drawHex(int r, int c, char owner, char minion, char minionOwner)
	{
		Map<Pair<Integer, Integer>, Character> hexASCII = new HashMap<>();
		hexASCII.put(new Pair<>(r + 0, c + 1), '/');
		hexASCII.put(new Pair<>(r + 0, c + 2), '=');
		hexASCII.put(new Pair<>(r + 0, c + 3), '\\');
		hexASCII.put(new Pair<>(r + 1, c + 0), '<');
		hexASCII.put(new Pair<>(r + 1, c + 1), owner);
		hexASCII.put(new Pair<>(r + 1, c + 2), minion);
		hexASCII.put(new Pair<>(r + 1, c + 3), minionOwner);
		hexASCII.put(new Pair<>(r + 1, c + 4), '>');
		hexASCII.put(new Pair<>(r + 2, c + 1), '\\');
		hexASCII.put(new Pair<>(r + 2, c + 2), '=');
		hexASCII.put(new Pair<>(r + 2, c + 3), '/');

		paintCanvas(hexASCII);
	}

	/*
	..*..
	.***.
	*****
	.***.
	..*..
	*/
	private void drawDiamond(int r, int c)
	{
		Map<Pair<Integer, Integer>, Character> diamondASCII = new HashMap<>();
		diamondASCII.put(new Pair<>(r + 0, c + 2), '*');
		diamondASCII.put(new Pair<>(r + 1, c + 1), '*');
		diamondASCII.put(new Pair<>(r + 1, c + 2), '*');
		diamondASCII.put(new Pair<>(r + 1, c + 3), '*');
		diamondASCII.put(new Pair<>(r + 2, c + 0), '*');
		diamondASCII.put(new Pair<>(r + 2, c + 1), '*');
		diamondASCII.put(new Pair<>(r + 2, c + 2), '*');
		diamondASCII.put(new Pair<>(r + 2, c + 3), '*');
		diamondASCII.put(new Pair<>(r + 2, c + 4), '*');
		diamondASCII.put(new Pair<>(r + 3, c + 1), '*');
		diamondASCII.put(new Pair<>(r + 3, c + 2), '*');
		diamondASCII.put(new Pair<>(r + 3, c + 3), '*');
		diamondASCII.put(new Pair<>(r + 4, c + 2), '*');

		paintCanvas(diamondASCII);
	}

	private void drawString(String s, int r, int c)
	{
		char[] chs = s.toCharArray();
		Map<Pair<Integer, Integer>, Character> stringASCII = new HashMap<>();
		for (var ch : chs)
		{
			stringASCII.put(new Pair<>(r, c++), ch);
		}

		paintCanvas(stringASCII);
	}

	private void paintCanvas(Map<Pair<Integer, Integer>, Character> elem)
	{
		for (var e : elem.entrySet())
			canvas[e.getKey().fst()][e.getKey().snd()] = e.getValue();
	}


}
