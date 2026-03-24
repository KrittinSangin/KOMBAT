package org.example.kombatfetchingback.handler;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.example.kombatfetchingback.repository.UserJoinedHandler;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ConcurrentHashMap;

@Setter
@Getter
@RestController
@RequiredArgsConstructor
public class MyDataHandler implements DataHandler
{
	private final ConcurrentHashMap<String, Boolean> roomIsActive = new ConcurrentHashMap<>();
	private final UserJoinedHandler userJoinedHandler;

	@Override
	public String sendTestData()
	{
		return "Successfully created a room";
	}

	public MessageHolder initializeWebSocket(String id)
	{
		if (roomIsActive.containsKey(id))
		{
			return new MyMessageHolder(false, "Room already exists");
		}
		roomIsActive.put(id, true);
		return new MyMessageHolder(true, "Successfully created a room");
	}

	public MessageHolder handleJoinRequest(String id)
	{
		if (roomIsActive.containsKey(id))
		{
			roomIsActive.remove(id);
			return new MyMessageHolder(true, "ws://localhost:8080/ws/" + id);
		}
		return new MyMessageHolder(false, "Room does not exists");
	}
}