package com.oop11.kombat_backend.Games.Configs;

import com.oop11.kombat_backend.Games.Map.HexPos;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

class ConfigReaderTest
{
	@Test
	@Disabled
	void testValidationREGEX()
	{
		String regex = "(\\[((\\(\\d+,\\d+\\))(,\\(\\d+,\\d+\\))*)?])";
		assertTrue("[]".matches(regex));
		assertTrue("[(2,3)]".matches(regex));
		assertTrue("[(6,8),(7,12),(9,8)]".matches(regex));

		String regexFull = " *(%s) *= *((\\d+)|(\\[((\\(\\d+,\\d+\\))(,\\(\\d+,\\d+\\))*)?]))".formatted(ConfigReader.CONFIG_KEYWORD_union());
		assertTrue("init_hex_1=[]".matches(regexFull));
		assertTrue("init_hex_1=[(2,3)]".matches(regexFull));
		assertTrue("init_hex_1=[(6,8),(7,12),(9,8)]".matches(regexFull));
		assertTrue("init_hex_2=[]".matches(regexFull));
		assertTrue("init_hex_2=[(2,3)]".matches(regexFull));
		assertTrue("init_hex_2=[(6,8),(7,12),(9,8)]".matches(regexFull));

	}

	@Test
	@Disabled
	void readConfig()
	{
		ConfigReader cr = new ConfigReader();

		//default file
		String resourcesPath = "src/main/resources/config/";
		String defaultFileName = "default.txt";
		String testGoodFileName = "test_good.txt";
		String testBadFileName = "test_bad.txt";

		String defaultFilePath = resourcesPath + defaultFileName;
		String testGoodFilePath = resourcesPath + testGoodFileName;
		String testBadFilePath = resourcesPath + testBadFileName;

		try (BufferedReader br = new BufferedReader(new FileReader(defaultFilePath)))
		{
			Config cfg = cr.readConfig(br.readAllAsString());
			assertEquals(Config.defaultConfig(),cfg);
		}
		catch (IOException e)
		{
			fail();
		}

		try (BufferedReader br = new BufferedReader(new FileReader(testGoodFilePath)))
		{
			Config cfg = cr.readConfig(br.readAllAsString());
			assertEquals(Config.builder()
					.spawnCost(19)
					.hexPurchaseCost(48945)
					.initBudget(99999)
					.initHp(1)
					.turnBudget(72)
					.maxBudget(1066600)
					.interestPct(178)
					.maxTurns(1)
					.maxSpawns(210)
					.mapWidth(5)
					.mapHeight(38)
					.startHexPosP1(Set.of())
					.startHexPosP2(Set.of(
						new HexPos(7, 7),
						new HexPos(7, 8),
						new HexPos(8, 6),
						new HexPos(8, 7),
						new HexPos(8, 8),
						new HexPos(20,20)
					))
					.build()
				,cfg);
		}
		catch (IOException e)
		{
			fail();
		}

		try (BufferedReader br = new BufferedReader(new FileReader(testBadFilePath)))
		{
			Config cfg = cr.readConfig(br.readAllAsString());
			assertEquals(Config.builder().build(),cfg);
		}
		catch (IOException e)
		{
			fail();
		}
	}
}