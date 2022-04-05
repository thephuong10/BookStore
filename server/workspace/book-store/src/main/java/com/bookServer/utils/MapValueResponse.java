package com.bookServer.utils;

import java.util.HashMap;
import java.util.Map;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MapValueResponse {

	private Map<String, Object> map = new HashMap<>();

	private static MapValueResponse instance = null;

	public static MapValueResponse getInstance() {
		if (instance == null) {

			instance = new MapValueResponse();
		}

		return instance;

	}

	public MapValueResponse put(String key, Object value) {

		instance.map.put(key, value);

		return instance;

	}

	public Map<String, Object> get() {

		return instance.map;

	}

	public Object get(String key) {

		return instance.map.containsKey(key) ? instance.map.get(key) : null;

	}

	public Map<String, Object> getAndReset() {

		Map<String, Object> result = instance.map;

		
		if(instance.map.size() != 0) {
			instance.map = new HashMap<>();
		}

		return result;
	}
}
