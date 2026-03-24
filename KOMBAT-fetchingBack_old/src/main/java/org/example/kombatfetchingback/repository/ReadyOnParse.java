package org.example.kombatfetchingback.repository;

import lombok.Getter;
import org.example.kombatfetchingback.model.ParseReadyMessage;
import org.example.kombatfetchingback.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Getter
@Service
public final class ReadyOnParse
{
	private static ConcurrentHashMap<String, Boolean> Existent = new ConcurrentHashMap<String, Boolean>();

	public static void handleUser(ParseReadyMessage mod)
	{
		Existent.put(mod.getHostID(), mod.isReady());
	}

	public static boolean checkBothReady()
	{
		if (Existent.size() < 2) return false;
		return Existent.values().stream().allMatch(b->b);
	}
}
