package com.oop11.kombat_backend.Games.DTO;

import lombok.Builder;

import java.util.List;

@Builder
public record HexMapDTO(List<HexDTO> hexMap)
{
}
