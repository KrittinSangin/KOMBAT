package org.example.kombatfetchingback.kombat_backend.Games.DTO;

import lombok.Builder;

import java.util.List;

@Builder
@Deprecated
public record HexMapDTO(
	int width,
	int height
)
{
}
