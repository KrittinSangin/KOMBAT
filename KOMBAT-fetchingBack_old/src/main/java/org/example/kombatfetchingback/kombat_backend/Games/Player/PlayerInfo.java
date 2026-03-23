package org.example.kombatfetchingback.kombat_backend.Games.Player;

import lombok.Builder;

import java.util.Objects;

@Builder
public record PlayerInfo(String name, int team)
{
	@Override
	public int hashCode()
	{
		return Objects.hash(name,team);
	}

	@Override
	public boolean equals(Object o)
	{
		if (this == o) return true;
		if (!(o instanceof PlayerInfo other)) return false;

		return name.equals(other.name)
			&& team == other.team;
	}
}
