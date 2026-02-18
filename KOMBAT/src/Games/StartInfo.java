package Games;

import java.util.List;

public record StartInfo(
	PlayerInfo info1,
	PlayerInfo info2,
	List<Minion> deck1,
	List<Minion> deck2)
{
}
