package com.bookServer.utils;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.util.StringUtils;

public class FuncitionUtils {
	
	private static Random random = new Random();

	public static String createVerificationToken() {

		StringBuilder code = new StringBuilder("");

		for (int i = 0; i < 5; i++) {
			code.append(random.nextInt(9) + 1);
		}

		return code.toString();
	}
	
	public static Map<String, Object>createMap(Object...values){
		
			
		try {
			
			if (values!=null && values.length > 1) {
				
				Map<String, Object>result = new HashMap<>();
				
				int length = values.length;

				if (values.length % 2 != 0) {
					length--;
				}

				for (int i = 0; i < length; i += 2) {
					result.put((String) values[i], values[i + 1]);
				}
				
				return result;
			}
			
		} catch (ClassCastException e) {
					
		}
		
		return null;
		
		
	}
	
	public static String generateSlug(String name) {	
		return  Normalizer.normalize(name, Normalizer.Form.NFD)
				.replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
				.toLowerCase()
				.replaceAll("đ", "d")
				.replaceAll(" ", "-");
	}
	
	public static Map<String, Object>spread(Object object) {
		
		Map<String, Object>result=new HashMap<String, Object>();
		
		for (Field field : object.getClass().getDeclaredFields()) {
			
			field.setAccessible(true);
			
			try {
				
				result.put(field.getName(), field.get(object));
				
				field.setAccessible(false);
				
			} catch (IllegalArgumentException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return result;
	}
	
	public static void mergeFields(Object obj_a,Object obj_b,
			Class<?>class_a,Class<?>class_b) {
		try {

			for (Field field_a : class_a.getDeclaredFields()) {
				field_a.setAccessible(true);
				Optional<?> obj = Optional.ofNullable(field_a.get(obj_a));

				if (obj.isPresent()) {
					Field field_b = class_b.getDeclaredField(field_a.getName());
					field_b.setAccessible(true);
					field_b.set(obj_b, obj.get());
					field_b.setAccessible(false);
				}
				field_a.setAccessible(true);

			}


		} catch (NoSuchFieldException | SecurityException 
				| IllegalArgumentException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static Object mergeEntity(Object a, Object b,String abstractName) {

		if(StringUtils.hasText(abstractName)) {
			
			if(a.getClass().getSuperclass().getSimpleName().equals(abstractName)) {
				
				mergeFields(a, b, a.getClass().getSuperclass(), b.getClass().getSuperclass());
			}

			mergeFields(a, b, a.getClass(), b.getClass());
			
		} else {
			
			mergeFields(a, b, a.getClass(), b.getClass());
		}

		return b;
	}
	
	
   public static Object getNumber(String type,String value) {
	   
	   switch (type) {
	   	case "Integer":
		
	   		return new Integer(value);
	   		
	   	case "BigDecimal":
			
	   		return new BigDecimal(value);
	   		
	   	case "Long":
			
	   		return new Long(value);
	   		
	   	case "Double":
			
	   		return new Double(value);

	   	default:
	   		return value;
	}
   }

}
