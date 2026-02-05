public record Pair<T,U>(T fst, U snd)
{
	@Override
	public String toString()
	{
		return "(%s,%s)".formatted(fst.toString(),snd.toString());
	}
}
