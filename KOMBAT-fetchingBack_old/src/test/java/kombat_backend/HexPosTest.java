package kombat_backend;


import org.example.kombatfetchingback.kombat_backend.Games.Map.HexDir;
import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HexPosTest
{

	@Test
	void nextInDir()
	{
		HexPos oddCol = new HexPos(2, 3);
		assertEquals(new HexPos(1, 3), oddCol.nextInDir(HexDir.up));
		assertEquals(new HexPos(2, 4), oddCol.nextInDir(HexDir.upRight));
		assertEquals(new HexPos(3, 4), oddCol.nextInDir(HexDir.downRight));
		assertEquals(new HexPos(3, 3), oddCol.nextInDir(HexDir.down));
		assertEquals(new HexPos(3, 2), oddCol.nextInDir(HexDir.downLeft));

		HexPos evenCol = new HexPos(2, 2);
		assertEquals(new HexPos(1, 2), evenCol.nextInDir(HexDir.up));
		assertEquals(new HexPos(1, 3), evenCol.nextInDir(HexDir.upRight));
		assertEquals(new HexPos(2, 3), evenCol.nextInDir(HexDir.downRight));
		assertEquals(new HexPos(3, 2), evenCol.nextInDir(HexDir.down));
		assertEquals(new HexPos(2, 1), evenCol.nextInDir(HexDir.downLeft));
		assertEquals(new HexPos(1, 1), evenCol.nextInDir(HexDir.upLeft));
	}
}