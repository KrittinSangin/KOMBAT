HexMap is a container of [[Hex]]. A container will not be concern of what is happening inside or outside. HexMap just exist for others to use it.

HexMap itself is not hard to imagine how it would work. But actually building it hard, you need to build a mathematical model of this HexMap first.
## What It Does
- Store [[hex]]
- Provide access to a hex at coords.
- Utility function such as finding neighbor, searching, etc.

```mermaid
classDiagram
direction LR
Game *-- HexMap
Game : ...
HexMap *-- Hex
HexMap : -Map~HexPos,Hex~ map
HexMap : +int width
HexMap : +int height
HexMap : HexMap(int width,int height)
HexMap : Hex Get(HexPos pos)
HexMap : bool Put(HexPos pos, Minion m)
HexMap : bool Remove(HexPos pos)
HexMap : bool Occupy(HexPos pos)
HexMap : bool HasNeighbourOf(HexPos pos, Player p)
HexMap : Hex? NextOf(HexPos pos, HexDir dir)
HexMap : Hex[] GetOccupyHexInLine(HexPos pos)
HexMap : ...(more utility function)
Hex : ...
```
![[Pasted image 20260120235917.png]]
[[Hex]]
[[HexPos]]
[[HexDir]]