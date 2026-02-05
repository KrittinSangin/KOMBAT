import Games.*;

import java.util.ArrayList;
import java.util.List;

public class Main
{
    void main()
    {
		populateConfig();

		PlayerInfo p1info = new PlayerInfo("a",0);
		PlayerInfo p2info = new PlayerInfo("a",1);

		List<Minion> universalDeck = new ArrayList<>();
		universalDeck.add(new Minion("1",(int)Config.INIT_HP,10,new Strategy()));
		universalDeck.add(new Minion("2",(int)Config.INIT_HP,10,new Strategy()));
		universalDeck.add(new Minion("3",(int)Config.INIT_HP,10,new Strategy()));
		universalDeck.add(new Minion("4",(int)Config.INIT_HP,10,new Strategy()));
		universalDeck.add(new Minion("5",(int)Config.INIT_HP,10,new Strategy()));
		StartInfo info = new StartInfo(
			p1info,
			p2info,
			new ArrayList<>(universalDeck),
			new ArrayList<>(universalDeck)
		);

		Game instance = new Game(info);
		instance.start();
    }

	private void populateConfig()
	{
		Config.SPAWN_COST 			= 100;
		Config.HEX_PURCHASE_COST 	= 100;
		Config.INIT_BUDGET 			= 1000;
		Config.INIT_HP 				= 100;
		Config.TURN_BUDGET 			= 100;
		Config.MAX_BUDGET 			= 10000;
		Config.INTEREST_PCT 		= 10;
		Config.MAX_TURNS 			= 10;
		Config.MAX_SPAWNS 			= 20;

		//additional config
		Config.MAP_WIDTH 			= 8;
		Config.MAP_HEIGHT 			= 8;

		Config.START_HEX_POS_P1 	= new HexPos[]
			{
				new HexPos(1,1),
				new HexPos(1,2),
				new HexPos(1,3),
				new HexPos(2,1),
				new HexPos(2,2),
			};

		Config.START_HEX_POS_P2 	= new HexPos[]
			{
				new HexPos(7,7),
				new HexPos(7,8),
				new HexPos(8,6),
				new HexPos(8,7),
				new HexPos(8,8),
			};
	}
}