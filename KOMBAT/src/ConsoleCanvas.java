import Games.*;

import java.util.Map;

public class ConsoleCanvas
{
	private static final int CANVAS_WIDTH = 150;
	private static final int CANVAS_HEIGHT = 25;

	private final Game instance;
	private char[][] canvas = new char[CANVAS_HEIGHT][CANVAS_WIDTH];


	public ConsoleCanvas(Game instance)
	{
		this.instance = instance;
	}

	public void draw()
	{
		//clear to black
		fillCanvas('.');



		//draw to screen
		StringBuilder sb;
		for(int r = 0; r < CANVAS_HEIGHT; r++)
		{
			sb = new StringBuilder();
			for(int c = 0; c < CANVAS_WIDTH; c++)
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
		for(int r = 0; r < CANVAS_HEIGHT; r++)
		{
			for(int c = 0; c < CANVAS_WIDTH; c++)
			{
				canvas[r][c] = symbol;
			}
		}
	}


	private void drawHexMap(HexMap map)
	{

	}

	/*
	./=\.
	<...>
	.\=/.
	*/
	private void drawHex(int r, int c)
	{

	}


}
