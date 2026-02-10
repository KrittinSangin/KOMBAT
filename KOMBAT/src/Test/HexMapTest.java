package Test;

import Games.Game;
import Games.HexMap;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HexMapTest
{
	@Test
	void testHashCode()
	{
		HexMap map1 = new HexMap(1,1);
		HexMap map2 = new HexMap(1,1);

		assertEquals(map1.hashCode(),map2.hashCode());

		Game g1 = TestingUtility.instantiateGameDefault();
		Game g2 = TestingUtility.instantiateGameDefault();

		assertEquals(g1.getMap().hashCode(),g2.getMap().hashCode());
		assertEquals(g1.getMap(), g2.getMap());

		TestingUtility.forcePlaceMinion(g1,1,1,0);
		TestingUtility.forcePlaceMinion(g2,1,1,0);

		assertEquals(g1.getMap().hashCode(),g2.getMap().hashCode());

		TestingUtility.forceRemoveMinion(g2,1,1);

		assertNotEquals(g1.getMap().hashCode(),g2.getMap().hashCode());
	}

	@Test
	void testEquals()
	{
		HexMap map1 = new HexMap(1,1);
		HexMap map2 = new HexMap(1,1);

		assertEquals(map1, map2);

		Game g1 = TestingUtility.instantiateGameDefault();
		Game g2 = TestingUtility.instantiateGameDefault();

		assertEquals(g1.getMap(), g2.getMap());

		TestingUtility.forcePlaceMinion(g1,1,1,0);
		TestingUtility.forcePlaceMinion(g2,1,1,0);

		assertEquals(g1.getMap(), g2.getMap());

		TestingUtility.forceRemoveMinion(g2,1,1);

		assertNotEquals(g1.getMap(), g2.getMap());
	}
}