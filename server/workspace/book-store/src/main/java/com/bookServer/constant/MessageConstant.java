package com.bookServer.constant;

public class MessageConstant {

	public static class Mail {

		public static final String MAIL_INVALID = "Email không hợp lệ !";

		public static final String EMAIL_IS_ALREADY = "Email này đã tồn tại trong hệ thống !";

		public static final String MAIL_SUBJECT = "Xác nhận mã đăng ký !";

		public static final String EMAIL_NOT_EXISTS = "Email này không tồn tồn tại trong hệ thống";

		public static String createContentVerificationToken(String name, String code) {

			return String.format("Xin chào %s ! " + "Chúng tôi chúng gửi cho bạn " + "mã xác nhận đăng ký "
					+ "tài khoản với mã số là : %s \n" + "Vui lòng lấy mã và xác nhận .", name, code);

		}
	}

	public static class Response {

		public static final String SC_INTERNAL_SERVER_ERROR = "Lỗi hệ thống";

		public static final String SC_OK = "Yêu cầu thành công";

		public static final String ALREADY_LOGGED = "Bạn đã đăng nhập !";
		
		public static final String SC_BAD = "Yêu cầu không thành công !";
		
		public static final String SC_UNAUTHORIZED = "Bạn không được phép truy cập !";

	}

	
}
