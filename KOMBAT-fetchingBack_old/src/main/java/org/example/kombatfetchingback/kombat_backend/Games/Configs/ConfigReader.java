package org.example.kombatfetchingback.kombat_backend.Games.Configs;

//spawn_cost=100
//hex_purchase_cost=1000
//init_budget=10000
//init_hp=100
//turn_budget=90
//max_budget=23456
//interest_pct=5
//max_turns=69
//max_spawns=47
//map_width=8
//map_height=8
//init_hex_1=[(,),(,),(,),(,),(,)]
//init_hex_2=[(,),(,),(,),(,),(,)]

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ConfigReader
{
	private static final String[] CONFIG_KEYWORD =
		{
			"spawn_cost",
			"hex_purchase_cost",
			"init_budget",
			"init_hp",
			"turn_budget",
			"max_budget",
			"interest_pct",
			"max_turns",
			"max_spawns",
			"map_width",
			"map_height",
			"init_hex_1",
			"init_hex_2"
		};

	public Config readConfig(String src)
	{
		src = src.toLowerCase();
		var cfgb = Config.builder();

		String[] lines = src.split("\r\n");
		for (var line : lines)
		{
			//validate line
			String validationREGEX = "^ *(%s) *= *((\\d+)|(\\[((\\(\\d+,\\d+\\))(,\\(\\d+,\\d+\\))*)?]))$".formatted(CONFIG_KEYWORD_union());
			if (!line.matches(validationREGEX)) continue;

			String[] split = line.split("=");

			String key = split[0].trim();
			String value = split[1].trim();

			buildConfig(cfgb,key,value);
		}

		return cfgb.build();
	}

	public static String CONFIG_KEYWORD_union()
	{
		StringBuilder sb = new StringBuilder();
		for (var s : CONFIG_KEYWORD)
		{
			sb.append("%s|".formatted(s));
		}

		sb.deleteCharAt(sb.lastIndexOf("|"));

		return sb.toString();
	}

	private Set<HexPos> buildConfigHexPosSet(String value)
	{
		Matcher matcher = Pattern.compile("\\(\\d+,\\d+\\)").matcher(value);

		Set<HexPos> hexPoses = new HashSet<>();

		while (matcher.find())
		{
			String s = matcher.group();
			s = s.replaceAll("\\(","").replaceAll("\\)","");

			String[] split = s.split(",");

			hexPoses.add(HexPos.builder()
				.row(Integer.parseInt(split[0]))
				.col(Integer.parseInt(split[1]))
				.build()
			);
		}

		return hexPoses;
	}

	private void buildConfig(Config.ConfigBuilder cfgb, String key, String value)
	{
		if  (key.equals(CONFIG_KEYWORD[0])) cfgb.spawnCost(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[1])) cfgb.hexPurchaseCost(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[2])) cfgb.initBudget(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[3])) cfgb.initHp(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[4])) cfgb.turnBudget(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[5])) cfgb.maxBudget(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[6])) cfgb.interestPct(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[7])) cfgb.maxTurns(Double.parseDouble(value));
		else if  (key.equals(CONFIG_KEYWORD[8])) cfgb.maxSpawns(Double.parseDouble(value));

		else if  (key.equals(CONFIG_KEYWORD[9])) cfgb.mapWidth(Integer.parseInt(value));
		else if  (key.equals(CONFIG_KEYWORD[10])) cfgb.mapHeight(Integer.parseInt(value));
		else if  (key.equals(CONFIG_KEYWORD[11])) cfgb.startHexPosP1(buildConfigHexPosSet(value));
		else if  (key.equals(CONFIG_KEYWORD[12])) cfgb.startHexPosP2(buildConfigHexPosSet(value));
	}
}
